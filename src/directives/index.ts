const directive = {
  'image-drag-drop-upload': {
    mounted: (el: Element, binding: any, vnode: any, prevVnode: any) => {
      const memoryImgEl = <HTMLImageElement>(
        el.querySelector('img.img-thumbnail')
      );
      let avtrOverlay = <HTMLDivElement>el.querySelector('.avtr-overlay');
      let avtrpara = <HTMLParagraphElement>el.querySelector('.avtr-para');
      avtrOverlay.addEventListener('drop', (e1: any) => {
        e1.preventDefault();
        e1.stopPropagation();
        const file = e1.dataTransfer.files[0];
        var obj = {
          target: {
            files: [file],
          },
        };
        binding.instance.avatarUplaod(obj);
        el.classList.remove('dotted-outline');
        avtrOverlay.classList.remove('backgroundDDD');
        avtrpara.classList.replace('show', 'hide');
      });
      el.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        el.classList.add('dotted-outline');
        avtrOverlay.classList.add('backgroundDDD');
        avtrpara.classList.replace('hide', 'show');
      });
      el.addEventListener('dragleave', (e) => {
        e.stopImmediatePropagation();
        el.classList.remove('dotted-outline');
        avtrOverlay.classList.remove('backgroundDDD');
        avtrpara.classList.replace('show', 'hide');
      });
    },
    unmounted: (el: Element, binding: any, vnode: any, prevVnode: any) => {
      el.removeEventListener('dragover', () => {}, true);
      el.removeEventListener('dragleave', () => {}, true);
    },
  },
};

export default directive;
