// Sistema de Template para páginas HTML estáticas
class TemplateManager {
    constructor() {
        this.layoutPath = 'layout.html';
        this.isInitialized = false;
    }

    async loadLayout() {
        try {
            const response = await fetch(this.layoutPath);
            if (!response.ok) {
                throw new Error(`Erro ao carregar layout: ${response.status}`);
            }
            const layoutHtml = await response.text();
            return layoutHtml;
        } catch (error) {
            console.error('Erro ao carregar layout:', error);
            return null;
        }
    }

    async applyTemplate(contentHtml) {
        const layoutHtml = await this.loadLayout();
        if (!layoutHtml) {
            console.error('Não foi possível carregar o layout');
            return;
        }

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
async function initializeTemplate() {
    // Verificar se já estamos usando o layout (evitar loop infinito)
    if (document.querySelector('header.topbar')) {
        return;
    }

    // Verificar se já foi inicializado
    if (window.templateManager && window.templateManager.isInitialized) {
        return;
    }

    window.templateManager = new TemplateManager();
    const mainContent = window.templateManager.extractMainContent();
    
    // Aplicar o template
    await window.templateManager.applyTemplate(mainContent);
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTemplate);
} else {
    initializeTemplate();
}
