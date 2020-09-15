window.onload = () => {
  let messages = staticLoadMessages();
  renderPlaces(messages);
};

function staticLoadMessages() {
 return [

 ];
}

function renderPlaces(messages) {
 let scene = document.querySelector('a-scene');

 messages.forEach((message) => {
     let latitude = message.location.lat;
     let longitude = place.location.lng;

     let model = document.createElement('a-entity');
     model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
     model.setAttribute('gltf-model', './assets/magnemite/scene.gltf');
     model.setAttribute('rotation', '0 180 0');
     model.setAttribute('animation-mixer', '');
     model.setAttribute('scale', '0.5 0.5 0.5');

     model.addEventListener('loaded', () => {
         window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
     });

     scene.appendChild(model);
 });
}