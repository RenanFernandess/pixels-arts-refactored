export default function createButton({
  text = '', id, className = 'buttons', name, callback, typeEvent = 'click',
  }) {
  const button = document.createElement('button');
  button.type = 'button';
  if (id) button.id = id;
  button.className = className;
  if (name) button.name = name;
  if (callback) button.addEventListener(typeEvent, callback);
  button.innerText = text;
  return button;
}