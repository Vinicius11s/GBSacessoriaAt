// Sistema para incluir o layout.html usando uma abordagem compatível com Netlify
class TemplateInclude {
    constructor() {
        this.isInitialized = false;
    }

    async loadAndApplyLayout() {
        // Verificar se já estamos usando o layout (evitar loop infinito)
        if (document.querySelector('header.topbar')) {
            return;
        }

        // Verificar se já foi inicializado
        if (this.isInitialized) {
            return;
        }

        try {
            // Extrair o conteúdo principal da página atual
            const mainContent = this.extractMainContent();
            
            // Carregar o layout
            const layoutHtml = await this.loadLayout();
            
            if (layoutHtml) {
                // Aplicar o layout
                this.applyLayout(layoutHtml, mainContent);
                this.isInitialized = true;
            }
        } catch (error) {
            console.error('Erro ao carregar layout:', error);
        }
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

    async loadLayout() {
        try {
            // Método 1: Tentar fetch
            const response = await fetch('layout.html');
            if (response.ok) {
                return await response.text();
            }
        } catch (error) {
            console.log('Fetch falhou, tentando método alternativo...');
        }

        // Método 2: Usar XMLHttpRequest
        try {
            return await this.loadLayoutXHR();
        } catch (error) {
            console.log('XHR falhou, tentando método iframe...');
        }

        // Método 3: Usar iframe (último recurso)
        try {
            return await this.loadLayoutIframe();
        } catch (error) {
            console.error('Todos os métodos falharam:', error);
            return null;
        }
    }

    loadLayoutXHR() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'layout.html', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject(new Error(`XHR Error: ${xhr.status}`));
                    }
                }
            };
            xhr.onerror = () => reject(new Error('XHR Network Error'));
            xhr.send();
        });
    }

    loadLayoutIframe() {
        return new Promise((resolve, reject) => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.style.position = 'absolute';
            iframe.style.left = '-9999px';
            iframe.src = 'layout.html';
            
            const timeout = setTimeout(() => {
                if (iframe.parentNode) {
                    iframe.parentNode.removeChild(iframe);
                }
                reject(new Error('Timeout ao carregar layout'));
            }, 5000);
            
            iframe.onload = () => {
                clearTimeout(timeout);
                try {
                    const layoutDoc = iframe.contentDocument || iframe.contentWindow.document;
                    const layoutHtml = layoutDoc.documentElement.outerHTML;
                    if (iframe.parentNode) {
                        iframe.parentNode.removeChild(iframe);
                    }
                    resolve(layoutHtml);
                } catch (error) {
                    if (iframe.parentNode) {
                        iframe.parentNode.removeChild(iframe);
                    }
                    reject(error);
                }
            };
            
            iframe.onerror = () => {
                clearTimeout(timeout);
                if (iframe.parentNode) {
                    iframe.parentNode.removeChild(iframe);
                }
                reject(new Error('Erro ao carregar layout via iframe'));
            };
            
            document.body.appendChild(iframe);
        });
    }

    applyLayout(layoutHtml, contentHtml) {
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
}

// Inicializar o sistema
const templateInclude = new TemplateInclude();

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        templateInclude.loadAndApplyLayout();
    });
} else {
    templateInclude.loadAndApplyLayout();
}

