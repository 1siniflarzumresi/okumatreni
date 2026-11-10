# MEB yıllık planlarından (1. sınıf Türkçe, Matematik, Hayat Bilgisi) deneme/veri/takvim.json üretir.
# Çalıştır (depo kökünden):  powershell -ExecutionPolicy Bypass -File kaynak\takvim-cikar.ps1
param(
  [string]$Kaynak = "kaynak",
  [string]$Cikti  = "deneme\veri\takvim.json"
)
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression.FileSystem

$DOSYA = [ordered]@{
  turkce        = "1-sinif-turkce-yillik-plan.docx"
  matematik     = "1-sinif-matematik-yillik-plan.docx"
  hayat_bilgisi = "1-sinif-hayat-bilgisi-yillik-plan.docx"
}
foreach ($k in @($DOSYA.Keys)) {
  $p = Join-Path $Kaynak $DOSYA[$k]
  if (-not (Test-Path $p)) { $p = Join-Path (Join-Path $Kaynak "meb") $DOSYA[$k] }
  if (-not (Test-Path $p)) { throw "Plan bulunamadı: $($DOSYA[$k])" }
  $DOSYA[$k] = (Resolve-Path $p).Path
}

# Yazım düzeltmesi: ders yılı Haziran 2027'de biter; "Aralık 2027" = Aralık 2026.
function Duzelt([string]$s) {
  if ($null -eq $s) { return $s }
  $s = $s -replace 'Aralık\s+2027', 'Aralık 2026'
  $s = $s -replace 'Yol Arkadaşım Kitaplar', 'Yol Arkadaşımız Kitaplar'   # plan özet tablosundaki tema adı; haftalık tabloda doğrusu yazıyor
  $s = $s -replace 'MAT\.\s+1\.', 'MAT.1.'          # "MAT. 1.3.3." → "MAT.1.3.3."
  $s = $s -replace 'Kıs Geldi', 'Kış Geldi' -replace 'En Degerli Hazine', 'En Değerli Hazine'   # plandaki metin adı yazım hataları
  $s = $s -replace '(?<=[A-Za-zÇĞİÖŞÜçğıöşü])\((?=\d)', ' ('   # "Bayramı(29 Ekim)" → "Bayramı (29 Ekim)"
  return $s
}
# Hücre içi satır ayracı " / " boşlukludur; metnin kendi "/" işareti (Dinleme/izleme) korunur.
function Temiz([string]$s) { return ((($s -replace '\s+/(?=\s|$)|^/\s*', ' ') -replace '\s+', ' ') -replace '(\w)- (\w)', '$1$2').Trim() }
# Çıktı adı "-ebilme/-abilme" ile biter; sonrasına taşan metni kes
function CiktiAdi([string]$s) { $m = [regex]::Match($s, '^(.*bilme)(?=\W|$)'); if ($m.Success) { return $m.Groups[1].Value.Trim() }; return $s }

# docx → satırlar; her satır: @{ kolon(int) = metin }, birleşik hücreler (gridSpan) hesaba katılır
function Satirlar([string]$yol) {
  $z = [IO.Compression.ZipFile]::OpenRead($yol)
  try { $x = (New-Object IO.StreamReader($z.GetEntry('word/document.xml').Open())).ReadToEnd() } finally { $z.Dispose() }
  $liste = @()
  foreach ($tr in [regex]::Matches($x, '<w:tr[ >].*?</w:tr>')) {
    $kol = 0; $s = @{}
    foreach ($tc in [regex]::Matches($tr.Value, '<w:tc>.*?</w:tc>')) {
      $sp = 1; $m = [regex]::Match($tc.Value, '<w:gridSpan w:val="(\d+)"'); if ($m.Success) { $sp = [int]$m.Groups[1].Value }
      $t = (($tc.Value -replace '</w:p>', ' / ' -replace '<w:br/>', ' / ' -replace '<w:tab/>', ' ' -replace '<[^>]+>', '') -replace '\s+', ' ').Trim(' /')
      $t = Duzelt([Net.WebUtility]::HtmlDecode($t))
      if ($t) { $s[$kol] = $t }
      $kol += $sp
    }
    $liste += ,$s
  }
  return $liste
}

$HAFTA_RE = '^(\d+)\.\s*Hafta\s*:?\s*/?\s*(.*)$'
$KOD_RE   = '(T\.[A-Z]\.1\.\d+|MAT\.1\.\d+\.\d+|HB\.1\.\d+\.\d+)'

# Her plan için: hafta no → @{ unite; konu; metin(tüm hücreler); gun; tarih }
$PLAN = @{}; $UNITE_OZET = @{}; $BASLIK = @{}; $KONU_TEK = @{}
foreach ($ders in $DOSYA.Keys) {
  $hs = @{}; $cur = $null; $ozet = @(); $ozetBitti = $false
  foreach ($r in (Satirlar $DOSYA[$ders])) {
    $vals = @($r.Values)
    # Özet tablo (en üstte): ünite, başlama, bitiş
    if (-not $ozetBitti) {
      if (($vals -join ' ') -match 'TOPLAM') { $ozetBitti = $true; continue }
      if ($r[2] -match '\d{4}$' -and $r[3] -match '\d{4}$') { $ozet += [ordered]@{ ad = $r[1]; baslangic = $r[2]; bitis = $r[3] } }
      continue
    }
    # Hafta hücresi kolon 1'de olur; birkaç satırda kayma var (kolon 0)
    $hk = $null
    foreach ($c in 0, 1) { if ($r[$c] -match $HAFTA_RE) { $hk = $c; break } }
    if ($null -ne $hk) {
      $no = [int]$Matches[1]; $tarih = (Temiz $Matches[2])
      $cur = @{ tarih = $tarih; unite = @(); konu = @(); metin = @(); gun = @() }
      $hs[$no] = $cur
    }
    if ($null -eq $cur) { continue }
    if (($vals -join ' ') -match 'TATİL') { $cur = $null; continue }
    if ($r[1] -eq 'HAFTA' -or $r[0] -eq 'SÜRE') { continue }
    $off = 0; if ($hk -eq 0) { $off = -1 }
    $u = $r[3 + $off]; $k = $r[4 + $off]; $g = $r[11 + $off]
    if ($r[2 + $off] -match 'SOSYAL ETKİNLİK') { $u = 'SOSYAL ETKİNLİK HAFTASI' }
    if ($u) { $cur.unite += $u }
    if ($k) {
      $cur.konu += $k
      # boş satırla (" / / ") ayrılmış parçalar kesin ayrı konudur
      foreach ($pp in ($k -split '\s+/(?:\s+/)+\s+')) { if ($pp -notmatch '\s/(\s|$)') { $KONU_TEK[($pp -replace '^\*', '').Trim()] = 1 } }
    }
    if ($g) { $cur.gun += $g }
    $cur.metin += ($vals -join ' / ')
  }
  $PLAN[$ders] = $hs; $UNITE_OZET[$ders] = $ozet

  # Çıktı kodu → başlık (plandaki en sık yazılış)
  $aday = @{}
  foreach ($h in $hs.Values) {
    foreach ($t in $h.metin) {
      foreach ($m in [regex]::Matches($t, $KOD_RE + '\.?\s*(?:/\s*)?(.*?)(?=\s+/?\s*[a-zçğıöşü]\)\s|' + $KOD_RE + '|\s/\s/|$)')) {
        $b = CiktiAdi (Temiz $m.Groups[2].Value)
        if ($b.Length -lt 8) { continue }
        $kod = $m.Groups[1].Value
        if (-not $aday[$kod]) { $aday[$kod] = @{} }
        $aday[$kod][$b] = 1 + [int]$aday[$kod][$b]
      }
    }
  }
  foreach ($kod in $aday.Keys) {
    $BASLIK[$kod] = ($aday[$kod].GetEnumerator() | Sort-Object { -$_.Value }, { $_.Key.Length } | Select-Object -First 1).Key
  }
}

function Kodlar($h) {
  $set = [ordered]@{}
  foreach ($t in $h.metin) { foreach ($m in [regex]::Matches($t, $KOD_RE)) { $set[$m.Value] = 1 } }
  return @($set.Keys | ForEach-Object { [ordered]@{ kod = $_; ad = $BASLIK[$_] } })
}
function Tekil($arr) { $s = [ordered]@{}; foreach ($a in $arr) { if ($a) { $s[$a] = 1 } }; return @($s.Keys) }

function TurkceAlan($h) {
  $hepsi = ($h.unite -join ' / ')
  $tema = Tekil(@([regex]::Matches($hepsi, '\d\.\s*TEMA:\s*([^(/]+)') | ForEach-Object { (Temiz $_.Groups[1].Value) }))
  if (-not $tema.Count) { $tema = Tekil(@($h.unite | ForEach-Object { Temiz $_ })) }
  $harf = Tekil(@([regex]::Matches($hepsi, '\(\s*\S\s*-\s*(\S)\s*sesi\)') | ForEach-Object { $_.Groups[1].Value }))
  $metin = Tekil(@([regex]::Matches($hepsi, '([^/()]+?)\s*\(\s*(?:Dinleme|İzleme|Okuma)\s*/?\s*metni\s*\)') |
             ForEach-Object { ((Temiz $_.Groups[1].Value) -replace '^.*(sesi\)|TEMA:[^)]*\))\s*', '').Trim() }))
  return [ordered]@{ tema = @($tema); harfler = @($harf); konu = @($metin); ciktilar = @(Kodlar $h) }
}
# Ünite adlarını özet tablodaki adlarla eşleştir ("NESNELERİN / GEOMETRİSİ (1)" → tek ad)
function UniteBul($metinler, $ders) {
  $duz = { param($x) (($x -replace '-(\d)$', ' ($1)') -replace '[,/]', ' ' -replace '\s+', ' ').Trim().ToUpper() }
  $t = & $duz ($metinler -join ' / ')
  $bul = @()
  foreach ($u in $UNITE_OZET[$ders]) {
    $ad = & $duz $u.ad; $i = $t.IndexOf($ad)
    if ($i -ge 0) { $bul += [pscustomobject]@{ i = $i; ad = $ad } }
  }
  $ozel = [regex]::Match($t, 'SOSYAL ETKİNLİK HAFTASI'); if ($ozel.Success) { $bul += [pscustomobject]@{ i = $ozel.Index; ad = $ozel.Value } }
  if ($bul.Count) { return Tekil(@($bul | Sort-Object i | ForEach-Object { $_.ad })) }
  return Tekil(@($metinler | ForEach-Object { Temiz $_ }))
}
function DigerAlan($h, $ders) {
  $unite = UniteBul $h.unite $ders
  $ham = ($h.konu -join ' / ')
  if ($ders -eq 'hayat_bilgisi') {
    $konu = Tekil(@([regex]::Matches($ham, '\(([^)]+)\)') | ForEach-Object { Temiz $_.Groups[1].Value }))
  } else {
    # Parçalar " / " ile ayrılır; tek kelimelik parça önceki satırın devamıdır ("Zihinden Çıkarma / İşlemi")
    $p = @()
    foreach ($x in ($ham -split '(?:\s+/)+\s+' |ForEach-Object { ($_ -replace '^\*', '').Trim() } | Where-Object { $_ })) {
      if ($p.Count -and $x -notmatch '\s' -and -not $KONU_TEK.ContainsKey($x)) { $p[$p.Count - 1] += " $x" } else { $p += $x }
    }
    $konu = Tekil($p)
  }
  return [ordered]@{ unite = @($unite); konu = @($konu); ciktilar = @(Kodlar $h) }
}

# Belirli günler: üç planın birleşimi, aynı ad bir kez
function GunAyir([string]$s) {
  $s = $s -replace '\)\s*(?=[A-ZÇĞİÖŞÜ])', ")`n"
  return @($s -split "`n|\s/\s/\s" | ForEach-Object { Temiz $_ } | Where-Object { $_ })
}
function GunAnahtar([string]$s) {
  $k = ($s.ToLower() -replace 'î', 'i' -replace '\(.*$', '' -replace '[^a-zçğıöşü0-9]', '')
  return $k
}
$AY = @{ 'Ocak'=1;'Şubat'=2;'Mart'=3;'Nisan'=4;'Mayıs'=5;'Haziran'=6;'Temmuz'=7;'Ağustos'=8;'Eylül'=9;'Ekim'=10;'Kasım'=11;'Aralık'=12 }
# "(29 Ekim)", "(10-16 Kasım)", "(29 Ekim-04 Kasım)" → ilk gün; ders yılı içindeyse tarih, değilse $null
function GunTarihi([string]$s) {
  $m = [regex]::Match($s, '\((\d{1,2})\s*(?:-\s*\d{1,2}\s*)?(Ocak|Şubat|Mart|Nisan|Mayıs|Haziran|Temmuz|Ağustos|Eylül|Ekim|Kasım|Aralık)')
  if (-not $m.Success) { return $null }
  $ay = $AY[$m.Groups[2].Value]; $yil = 2027; if ($ay -ge 9) { $yil = 2026 }
  if ($ay -in 7, 8) { return $null }
  return (Get-Date -Year $yil -Month $ay -Day ([int]$m.Groups[1].Value)).Date
}

# Haftalar: MEB 1. hafta = 14 Eylül 2026 Pazartesi
$tatiller = @(
  @{ bas = '2026-11-16'; son = '2026-11-20'; ad = '1. Dönem Ara Tatili'; tarih = '16-20 Kasım 2026'; gun = 5 },
  @{ bas = '2027-01-25'; son = '2027-02-05'; ad = 'Yarıyıl Tatili';      tarih = '25 Ocak - 5 Şubat 2027'; gun = 12 },
  @{ bas = '2027-03-08'; son = '2027-03-12'; ad = '2. Dönem Ara Tatili'; tarih = '8-12 Mart 2027'; gun = 5 }
)
$enBuyuk = ($PLAN.Values | ForEach-Object { $_.Keys } | Measure-Object -Maximum).Maximum
$pzt = [datetime]'2026-09-14'; $haftalar = @(); $no = 1
while ($no -le $enBuyuk) {
  $t = $tatiller | Where-Object { $_.bas -eq $pzt.ToString('yyyy-MM-dd') }
  if ($t) {
    $haftalar += [ordered]@{ hafta = $null; etiket = $t.ad; tarih = $t.tarih; baslangic = $t.bas; bitis = $t.son; tatil = $true; dersler = $null; belirli_gunler = @() }
    $pzt = ([datetime]$t.son).AddDays(3); continue
  }
  $tarih = ''; foreach ($d in 'matematik', 'hayat_bilgisi', 'turkce') { if ($PLAN[$d][$no]) { $tarih = $PLAN[$d][$no].tarih; break } }
  $dersler = [ordered]@{}
  foreach ($d in $DOSYA.Keys) {
    $h = $PLAN[$d][$no]
    if (-not $h) { $dersler[$d] = $null; continue }
    if ($d -eq 'turkce') { $dersler[$d] = TurkceAlan $h } else { $dersler[$d] = DigerAlan $h $d }
  }
  $haftalar += [ordered]@{
    hafta = $no; etiket = "$no. Hafta"; tarih = $tarih
    baslangic = $pzt.ToString('yyyy-MM-dd'); bitis = $pzt.AddDays(4).ToString('yyyy-MM-dd'); tatil = $false
    dersler = $dersler; belirli_gunler = @()
  }
  $pzt = $pzt.AddDays(7); $no++
}

# Belirli günler: üç planın birleşimi. Tarihi yazılı olan gün kendi tarihinin haftasına
# (tatile denk gelirse o tatile) konur; tarihsizler planda yazıldığı haftada kalır.
$GUN = [ordered]@{}
foreach ($d in $DOSYA.Keys) {
  foreach ($no in ($PLAN[$d].Keys | Sort-Object)) {
    foreach ($g in $PLAN[$d][$no].gun) {
      foreach ($x in (GunAyir $g)) { $k = GunAnahtar $x; if ($k -and -not $GUN[$k]) { $GUN[$k] = @{ ad = $x; hafta = $no } } }
    }
  }
}
foreach ($g in $GUN.Values) {
  $hedef = $null; $t = GunTarihi $g.ad
  if ($t) {
    for ($i = 0; $i -lt $haftalar.Count; $i++) {
      $bas = [datetime]$haftalar[$i].baslangic
      $son = if ($i + 1 -lt $haftalar.Count) { [datetime]$haftalar[$i + 1].baslangic } else { $bas.AddDays(7) }
      if ($t -ge $bas -and $t -lt $son) { $hedef = $haftalar[$i]; break }
    }
  }
  if (-not $hedef) { $hedef = $haftalar | Where-Object { $_.hafta -eq $g.hafta } | Select-Object -First 1 }
  if ($hedef) { $hedef.belirli_gunler += $g.ad }
}

$doc = [ordered]@{
  egitim_yili = '2026-2027'; sinif = 1
  kaynak = 'MEB 1. sınıf Türkçe, Matematik ve Hayat Bilgisi yıllık planları'
  uniteler = [ordered]@{ turkce = $UNITE_OZET.turkce; matematik = $UNITE_OZET.matematik; hayat_bilgisi = $UNITE_OZET.hayat_bilgisi }
  haftalar = $haftalar
}
# Sıkıştırılmış JSON, her hafta ayrı satırda (okunur ve küçük)
$json = ($doc | ConvertTo-Json -Depth 10 -Compress) -replace '\},\{"hafta":', "},`n{`"hafta`":" -replace '"haftalar":\[', "`"haftalar`":[`n"
[IO.File]::WriteAllText((Join-Path (Get-Location) $Cikti), $json, (New-Object Text.UTF8Encoding $false))
"Yazıldı: $Cikti  ($($haftalar.Count) satır, $(@($haftalar | Where-Object { -not $_.tatil }).Count) ders haftası)"
