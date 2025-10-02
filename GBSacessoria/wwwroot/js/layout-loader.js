// Sistema para carregar o layout.html original no Netlify
class LayoutLoader {
    constructor() {
        this.isInitialized = false;
        this.layoutCache = null;
    }

    async loadLayout() {
        // Se já temos o layout em cache, usar ele
        if (this.layoutCache) {
            return this.layoutCache;
        }

        try {
            // Tentar carregar via fetch primeiro
            const response = await fetch('layout.html');
            if (response.ok) {
                const layoutHtml = await response.text();
                this.layoutCache = layoutHtml;
                return layoutHtml;
            }
        } catch (error) {
            console.log('Fetch não funcionou, tentando método alternativo...');
        }

        // Método alternativo: usar iframe invisível para carregar o layout
        try {
            return await this.loadLayoutViaIframe();
        } catch (error) {
            console.error('Erro ao carregar layout:', error);
            return null;
        }
    }

    loadLayoutViaIframe() {
        return new Promise((resolve, reject) => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = 'layout.html';
            
            iframe.onload = () => {
                try {
                    const layoutDoc = iframe.contentDocument || iframe.contentWindow.document;
                    const layoutHtml = layoutDoc.documentElement.outerHTML;
                    document.body.removeChild(iframe);
                    this.layoutCache = layoutHtml;
                    resolve(layoutHtml);
                } catch (error) {
                    document.body.removeChild(iframe);
                    reject(error);
                }
            };
            
            iframe.onerror = () => {
                document.body.removeChild(iframe);
                reject(new Error('Erro ao carregar layout via iframe'));
            };
            
            document.body.appendChild(iframe);
        });
    }

    async applyLayout(contentHtml) {
        const layoutHtml = await this.loadLayout();
        if (!layoutHtml) {
            console.error('Não foi possível carregar o layout');
            return;
        }

        // Criar elemento temporário para manipular o HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = layoutHtml;

        // Encontrar o elemento main no layout
        const mainElement = tempDiv.querySelector('main');
        if (mainElement) {
            // Substituir o conteúdo do main
            mainElement.innerHTML = contentHtml;
        }

        // Substituir todo o conteúdo do body
        document.body.innerHTML = tempDiv.querySelector('body').innerHTML;

        // Marcar como inicializado
        this.isInitialized = true;

        // Re-executar scripts
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

// Função para inicializar o layout
async function initializeLayout() {
    // Verificar se já estamos usando o layout (evitar loop infinito)
    if (document.querySelector('header.topbar')) {
        return;
    }

    // Verificar se já foi inicializado
    if (window.layoutLoader && window.layoutLoader.isInitialized) {
        return;
    }

    window.layoutLoader = new LayoutLoader();
    const mainContent = window.layoutLoader.extractMainContent();
    
    // Aplicar o layout
    await window.layoutLoader.applyLayout(mainContent);
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLayout);
} else {
    initializeLayout();
}

