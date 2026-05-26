function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

export function lockBodyScroll() {
  const width = getScrollbarWidth();
  document.documentElement.style.setProperty('--scrollbar-width', `${width}px`);
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${width}px`;
}

export function unlockBodyScroll() {
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  document.documentElement.style.removeProperty('--scrollbar-width');
}
