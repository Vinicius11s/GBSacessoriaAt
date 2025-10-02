# Script para corrigir charset em todas as paginas HTML

$wwwrootPath = "GBSacessoria\wwwroot"

# Lista de arquivos HTML
$htmlFiles = @(
    "index.html", "detalhes01.html", "detalhes02.html", "detalhes03.html", "detalhes04.html", "detalhes05.html",
    "detalhes06.html", "detalhes07.html", "detalhes08.html", "detalhes09.html",
    "detalhes10.html", "detalhes11.html", "detalhes12.html", "detalhes13.html",
    "detalhes14.html", "detalhes15.html", "detalhes16.html", "sobre.html",
    "todasasareas.html", "teste-template.html"
)

foreach ($file in $htmlFiles) {
    $filePath = Join-Path $wwwrootPath $file
    
    if (Test-Path $filePath) {
        Write-Host "Corrigindo charset em $file..."
        
        # Ler o conteudo do arquivo
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        # Corrigir charset
        $content = $content -replace '<meta charset="utf-8" />', '<meta charset="UTF-8" />'
        
        # Salvar o arquivo corrigido
        Set-Content $filePath $content -Encoding UTF8
        Write-Host "OK $file corrigido"
    }
}

Write-Host "Charset corrigido em todas as paginas!"
