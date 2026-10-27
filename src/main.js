function estaVisibleCSS(elemento) {
  const estilos = window.getComputedStyle(elemento);
  return (
    estilos.display !== 'none' &&
    estilos.visibility !== 'hidden' &&
    estilos.opacity !== '0' &&
    elemento.offsetWidth > 0 &&
    elemento.offsetHeight > 0
  );
}
const changeAttr = (elem) => {
  (elem.getAttribute('aria-expanded') === 'true') ? elem.setAttribute('aria-expanded', 'false') : elem.setAttribute('aria-expanded', 'true')
}
const handleAccessibility = (e) => {
  const etarget = e.target;
  changeAttr(etarget);
}
const handleMenu = (menuTrigger) => {
  if(estaVisibleCSS(menuTrigger)) {
    changeAttr(menuTrigger);
  }
} 
const mainMenu = (menuTrigger) => {
   menuTrigger = document.querySelector('#menutrigger');
  if(menuTrigger) {
    menuTrigger.addEventListener('click', handleAccessibility, true)
  }
}
const navLinkbehavior = (menuTrigger, links) => { 
  if(!menuTrigger) return;
  links.forEach((link) =>{
    link.addEventListener('click', () => handleMenu(menuTrigger), true)
  })
}
const resetMenu = (links) => {
  if(links.length !== 0) {
    for (let index = 0; index < links.length; index++) {
      const link = links[index];
      if(link.hasAttribute('aria-current')) {
        link.removeAttribute('aria-current');
        link.classList.remove('transition-colors', 'py-space-xs', 'px-space-xs', 'rounded-lg', 'focus:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-french-blue', 'focus-visible:ring-offset-2', 'focus-visible:ring-offset-pale-oak', 'text-french-blue', 'underline', 'decoration-2', 'underline-offset-8', 'decoration-french-blue', 'font-semibold')
        link.classList.add('font-label-lg', 'text-label-lg', 'text-on-surface-variant', 'hover:text-carbon-black', 'transition-colors', 'py-space-xs', 'px-space-xs', 'rounded-lg', 'focus:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-french-blue', 'focus-visible:ring-offset-2', 'focus-visible:ring-offset-pale-oak')
        break;
      }
    }
  }  
}
const handleNavChange = (links) => {
  window.addEventListener("hashchange", (e) => {    
    resetMenu(links);
    const hashElem = window.location.hash;
    const target = document.querySelector('nav a[href="'+ hashElem +'"]');
    if(!target) return;
    target.classList.remove('font-label-lg', 'text-label-lg', 'text-on-surface-variant', 'hover:text-carbon-black', 'transition-colors', 'py-space-xs', 'px-space-xs', 'rounded-lg', 'focus:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-french-blue', 'focus-visible:ring-offset-2', 'focus-visible:ring-offset-pale-oak');
    target.classList.add('transition-colors', 'py-space-xs', 'px-space-xs', 'rounded-lg', 'focus:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-french-blue', 'focus-visible:ring-offset-2', 'focus-visible:ring-offset-pale-oak', 'text-french-blue', 'underline', 'decoration-2', 'underline-offset-8', 'decoration-french-blue', 'font-semibold')
    target.setAttribute('aria-current', 'page');
  });
}
(()=>{
  const menuTrigger = document.querySelector('#menutrigger');
  const links = document.querySelectorAll('#nav a');
  mainMenu(menuTrigger);
  navLinkbehavior(menuTrigger, links);
  handleNavChange(links);
})();

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  const alert = document.querySelector('#form-alert');
  const submitButton = document.querySelector('#submit-btn');
  const buttonText = document.querySelector('#btn-text');
  const spinner = document.querySelector('#btn-spinner');

  const showAlert = (message, isError = false) => {
    alert.textContent = message;
    alert.classList.remove('hidden', 'bg-emerald-100', 'text-emerald-900', 'bg-red-100', 'text-red-900');
    alert.classList.add(isError ? 'bg-red-100' : 'bg-emerald-100', isError ? 'text-red-900' : 'text-emerald-900');
  };

  const setFieldError = (fieldName, hasError) => {
    const field = contactForm.elements[fieldName];
    const error = document.querySelector(`#${fieldName}-error`);
    if (!field || !error) return;
    error.classList.toggle('hidden', !hasError);
    field.setAttribute('aria-invalid', String(hasError));
  };

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(contactForm));
    const invalidName = typeof data.name !== 'string' || data.name.trim().length < 2;
    const invalidEmail = typeof data.email !== 'string' || !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const invalidMessage = typeof data.message !== 'string' || data.message.trim().length < 6;

    setFieldError('name', invalidName);
    setFieldError('email', invalidEmail);
    setFieldError('message', invalidMessage);

    if (invalidName || invalidEmail || invalidMessage) {
      showAlert('Revisá los campos marcados antes de enviar.', true);
      return;
    }

    submitButton.disabled = true;
    buttonText.textContent = 'Enviando…';
    spinner.classList.remove('hidden');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(result.error || 'No se pudo enviar el mensaje.');

      showAlert(result.message || 'Mensaje enviado correctamente.');
      contactForm.reset();
    } catch (error) {
      showAlert(error.message, true);
    } finally {
      submitButton.disabled = false;
      buttonText.textContent = 'Enviar mensaje';
      spinner.classList.add('hidden');
    }
  });
}