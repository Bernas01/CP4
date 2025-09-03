(function(){
  function formatBRL(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
  const items = [];
  const itemsList = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  function render(){
    if(!itemsList) return;
    itemsList.innerHTML = items.map((it,idx)=>`
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${it.name}</strong>
          <div class="small text-muted">${formatBRL(it.price)}</div>
        </div>
        <button class="btn btn-sm btn-outline-danger" data-remove="${idx}"><i class="fa-solid fa-trash"></i></button>
      </li>
    `).join('');
    if(cartCount) cartCount.textContent = items.length;
    const total = items.reduce((s,i)=>s+i.price,0);
    if(cartTotal) cartTotal.textContent = formatBRL(total);
  }
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.add-to-cart');
    if(btn){
      items.push({name: btn.dataset.name, price: parseFloat(btn.dataset.price)});
      render();
    }
    const rm = e.target.closest('[data-remove]');
    if(rm){
      const idx = parseInt(rm.getAttribute('data-remove'));
      items.splice(idx,1);
      render();
    }
  });
  render();
  
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        alert('Mensagem enviada! Obrigado por entrar em contato.');
        form.reset();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();
