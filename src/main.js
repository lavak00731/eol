const changeAttr = (elem) => {
  (elem.getAttribute('aria-expanded') === 'true') ? elem.setAttribute('aria-expanded', 'false') : elem.setAttribute('aria-expanded', 'true')
}
const handleAccessibility = (e) => {
  const etarget = e.target;
  changeAttr(etarget);
}
const handleMenu = (menuTrigger) => {
  changeAttr(menuTrigger);
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
  handleNavChange(links)
})()