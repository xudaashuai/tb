/* eslint-disable no-param-reassign */
// js 文件
import Vue from 'vue';

Vue.directive('loading', {
  bind: (el: any, binding) => {
    const tempDiv = document.createElement('div');
    tempDiv.id = 'loading';
    const round = document.createElement('embed');
    round.src = '/assets/loading.svg';
    tempDiv.appendChild(round);
    el.loadingElement = tempDiv;
    /* if (binding.value) {
      const curStyle = window.getComputedStyle(el)
      const position = curStyle.position
      if (position === 'absolute' || position === 'relative') {
        el.style.position = position
      } else {
        el.style.position = 'relative'
      }
      el.appendChild(tempDiv)
    } else {
      if (tempDiv.parentNode !== null) {
        tempDiv.parentNode.removeChild(tempDiv)
      }
    } */
    const curStyle = window.getComputedStyle(el);
    el.style['min-height'] = '55px';
    const { position } = curStyle;
    if (position === 'absolute' || position === 'relative') {
      el.style.position = position;
    } else {
      el.style.position = 'relative';
    }
    if (binding.value) {
      el.appendChild(tempDiv);
    }
  },
  update: (el: any, binding) => {
    if (binding.value) {
      if (el.loadingElement.parentNode === null) {
        el.appendChild(el.loadingElement);
      }
    } else if (el === el.loadingElement.parentNode) {
      el.removeChild(el.loadingElement);
    }
  },
  unbind: (el: any) => {
    if (el.loadingElement.parentNode === el) {
      el.removeChild(el.loadingElement);
    }
    el.loadingElement = null;
  },
});
