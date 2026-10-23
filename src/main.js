const handleAccessibility = (e)=> {
  const etarget = e.target;
  (etarget.getAttribute('aria-expanded') === 'true') ? etarget.setAttribute('aria-expanded', 'false') : etarget.setAttribute('aria-expanded', 'true')

}
const mainMenu = () => {
  const menuTrigger = document.querySelector('#menutrigger');
  if(menuTrigger) {
    menuTrigger.addEventListener('click', handleAccessibility, true)
  }
}
(()=>{
  mainMenu();
})()