// Sistema de Template com layout inline para Netlify
class InlineTemplateManager {
    constructor() {
        this.isInitialized = false;
    }

    // Layout HTML inline para evitar problemas de CORS no Netlify
    getLayoutHTML() {
        return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GBS Assessoria - Especialistas em Imóveis Rurais</title>
    <link rel="icon" type="image/x-icon" href="teste.ico">
    <link rel="shortcut icon" href="teste.ico">
    <link rel="apple-touch-icon" href="teste.ico">

    <script type="importmap"></script>
    <link rel="stylesheet" href="lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/home.css" />
    <link rel="stylesheet" href="css/footer.css" />
    
    <style>
        /* Garantir que os links do header mantenham sempre a cor preta */
        .header-actions a,
        .header-actions a:link,
        .header-actions a:visited,
        .header-actions a:hover,
        .header-actions a:active,
        .header-actions a:focus {
            color: #000 !important;
        }
        
        .header-actions a:hover {
            color: #333 !important;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="topbar" role="banner">
        <div style="display:flex;align-items:center;gap:18px">
            <button class="hamburger" id="hamburger" aria-expanded="false" aria-controls="mobileMenu">
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="22" height="2" rx="1" fill="#111" />
                    <rect y="7" width="22" height="2" rx="1" fill="#111" />
                    <rect y="14" width="22" height="2" rx="1" fill="#111" />
                </svg>
            </button>

            <div class="brand">
                <a href="index.html" style="text-decoration: none;">
                    <img src="images/LogoFundoBrancoComNome.png" alt="GBS Assessoria" class="logo">
                </a>
            </div>
        </div>

        <nav class="nav-pills" aria-label="Navegação principal">
            <a href="todasasareas.html" class="pill">Acessar Todas as Áreas</a>
            <a href="todasasareas.html?estado=MS" class="pill">Mato Grosso do Sul</a>
            <a href="todasasareas.html?estado=SP" class="pill">São Paulo</a>
        </nav>

        <div class="header-actions">
            <a href="https://wa.me/5518996194671?text=Olá%20gostaria%20de%20vender%20meu%20imóvel">QUERO VENDER O MEU IMÓVEL</a>
            <a href="sobre.html">SOBRE A GBS ACESSORIA</a>
        </div>
    </header>

    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-content">
            <a href="todasasareas.html" class="mobile-menu-link">Acessar Todas as Áreas</a>
            <a href="todasasareas.html?estado=MS" class="mobile-menu-link">Mato Grosso do Sul</a>
            <a href="todasasareas.html?estado=SP" class="mobile-menu-link">São Paulo</a>
            <a href="https://wa.me/5518996194671?text=Olá%20gostaria%20de%20vender%20meu%20imóvel" class="mobile-menu-link">QUERO VENDER O MEU IMÓVEL</a>
            <a href="sobre.html" class="mobile-menu-link">SOBRE A GBS ACESSORIA</a>
        </div>
    </div>

    <!-- Conteúdo principal será inserido aqui -->
    <main>
        <div id="page-content">
            <!-- Conteúdo da página será inserido aqui dinamicamente -->
        </div>
    </main>

    <script src="lib/jquery/dist/jquery.min.js"></script>
    <script src="lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/site.js"></script>

    <br/>
    <br/>
    <footer>
        <div class="footer-container">
            <div class="footer-section">
                <div class="footer-logo">
                    <img src="images/GBS assessoria logo.PNG" alt="GBS Assessoria" class="logo">
                </div>
            </div>
            <div class="footer-section">
                <h3>Contato</h3>
                <ul>
                    <li>+55 18 99619-4671</li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Áreas de atuação</h3>
                <ul>
                    <li>Região de Presidente Prudente</li>
                    <li>região leste do estado de Mato Grosso do Sul</li>
                    <li>Bataguassu</li>
                    <li>Nova Andradina</li>
                    <li>Santa Rita do Pardo</li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Institucional</h3>
                <ul>
                    <li><a href="sobre.html">Sobre</a></li>
                    <li><a href="https://wa.me/5518996194671?text=Olá%20gostaria%20de%anuncuar%20meu%20imóvel">Anuncie seu imóvel</a></li>
                    <li><a href="https://wa.me/5518996194671?text=Olá%20gostaria%20de%20mais%20informações">Contato</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="footer-dropdown">
                <button class="dropdown-toggle">
                    Comprar ou alugar
                    <span class="arrow-down">&#9660;</span>
                </button>
            </div>
        </div>

        <div class="footer-legal">
            <div class="footer-copyright">
                CRECI 278448 F - Todos os direitos reservados
            </div>
        </div>
    </footer>
</body>
</html>`;
    }

    applyTemplate(contentHtml) {
        const layoutHtml = this.getLayoutHTML();
        
        // Criar um elemento temporário para manipular o HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = layoutHtml;

        // Encontrar o elemento main no layout
        const mainElement = tempDiv.querySelector('main');
        if (mainElement) {
            // Substituir o conteúdo do main pelo conteúdo da página atual
            mainElement.innerHTML = contentHtml;
        }

        // Substituir todo o conteúdo do body
        document.body.innerHTML = tempDiv.querySelector('body').innerHTML;

        // Marcar como inicializado
        this.isInitialized = true;

        // Re-executar scripts se necessário
        this.reinitializeScripts();
    }

    reinitializeScripts() {
        // Re-executar scripts que podem ter sido perdidos
        const scripts = document.querySelectorAll('script[data-reinit]');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            newScript.setAttribute('data-reinit', 'true');
            document.head.appendChild(newScript);
        });
    }

    // Método para extrair o conteúdo principal da página atual
    extractMainContent() {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            return mainElement.innerHTML;
        }
        
        // Se não houver main, pegar todo o conteúdo do body
        const bodyContent = document.body.innerHTML;
        return bodyContent;
    }
}

// Função para inicializar o template quando a página carregar
function initializeInlineTemplate() {
    // Verificar se já estamos usando o layout (evitar loop infinito)
    if (document.querySelector('header.topbar')) {
        return;
    }

    // Verificar se já foi inicializado
    if (window.inlineTemplateManager && window.inlineTemplateManager.isInitialized) {
        return;
    }

    window.inlineTemplateManager = new InlineTemplateManager();
    const mainContent = window.inlineTemplateManager.extractMainContent();
    
    // Aplicar o template
    window.inlineTemplateManager.applyTemplate(mainContent);
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeInlineTemplate);
} else {
    initializeInlineTemplate();
}
