// sample data for posters and features
const posters = [
  {
    id:1, title:"Vintage Travel Poster", category:"art",
    img:"https://picsum.photos/seed/p1/600/400",
    price:1200, discountPrice:840
  },
  {
    id:2, title:"Cult Classic Movie Poster", category:"movie",
    img:"https://picsum.photos/seed/p2/600/400",
    price:1500, discountPrice:1125
  },
  {
    id:3, title:"Live Concert Event Poster", category:"event",
    img:"https://picsum.photos/seed/p3/600/400",
    price:900, discountPrice:630
  },
  {
    id:4, title:"Custom Wedding Keepsake", category:"custom",
    img:"https://picsum.photos/seed/p4/600/400",
    price:1800, discountPrice:1260
  },
  {
    id:5, title:"Minimalist Art Print", category:"art",
    img:"https://picsum.photos/seed/p5/600/400",
    price:800, discountPrice:560
  },
  {
    id:6, title:"Birthday Party Poster", category:"event",
    img:"https://picsum.photos/seed/p6/600/400",
    price:700, discountPrice:490
  }
];

const features = [
  {id:'f1',name:'Riya Sharma', avatar:'https://picsum.photos/seed/a1/120/120', text:'Amazing print quality — colors are vibrant and the frame looks premium.'},
  {id:'f2',name:'Tech Fest Review', avatar:'https://picsum.photos/seed/a2/120/120', text:'The event posters were delivered fast and looked superb on the stage.'},
  {id:'f3',name:'Video Showcase', avatar:'video', text:'Short product video — click to play.'}
];

document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('year').textContent = new Date().getFullYear();
  renderFeatures();
  renderProducts(posters);

  // filter
  document.getElementById('categoryFilter').addEventListener('change',(e)=>{
    const val = e.target.value;
    if(val==='all') renderProducts(posters);
    else renderProducts(posters.filter(p=>p.category===val));
  });

  // modal close
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click',(ev)=>{
    if(ev.target.id==='modal') closeModal();
  });
});


function renderFeatures(){
  const container = document.getElementById('featureGrid');
  container.innerHTML = '';
  features.forEach(f=>{
    const card = document.createElement('div');
    card.className = 'card';
    if(f.avatar === 'video'){
      card.innerHTML = `
        <div style="border-radius:10px;overflow:hidden">
          <video controls style="width:100%;display:block">
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
            Your browser does not support video.
          </video>
        </div>
        <div class="feature-meta">
          <div>
            <strong>Product Video</strong>
            <p style="margin:6px 0;color:var(--muted)">${f.text}</p>
          </div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <img src="${f.avatar}" alt="${f.name}" />
        <div class="feature-meta">
          <img class="avatar" src="${f.avatar}" alt="">
          <div>
            <strong>${f.name}</strong>
            <p style="margin:6px 0;color:var(--muted);font-size:0.95rem">${f.text}</p>
          </div>
        </div>`;
    }
    container.appendChild(card);
  });
}

function renderProducts(list){
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  list.forEach(p=>{
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <span class="badge">${p.category.toUpperCase()}</span>
      <img src="${p.img}" alt="${p.title}" loading="lazy" />
      <div style="padding-top:8px">
        <div class="prod-title">${p.title}</div>
        <div class="price-row">
          <div class="real-price">₹${p.price}</div>
          <div class="discounted">₹${p.discountPrice}</div>
        </div>
        <div style="margin-top:8px;display:flex;gap:8px">
          <button class="btn" onclick="viewPoster(${p.id})">View</button>
          <button class="btn" onclick="addToCart(${p.id})">Add to cart</button>
        </div>
      </div>
    `;
    grid.appendChild(div);
  });

  if(list.length===0){
    grid.innerHTML = '<p style="color:var(--muted)">No posters found for this category.</p>';
  }
}

function viewPoster(id){
  const p = posters.find(x=>x.id===id);
  if(!p) return;
  document.getElementById('modalImg').src = p.img;
  document.getElementById('modalMeta').innerHTML = `<h4 style="margin:0">${p.title}</h4><p style="color:var(--muted);margin:6px 0">Category: ${p.category}</p><p style="font-weight:800;color:var(--accent)">₹${p.discountPrice}</p>`;
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden','true');
  document.getElementById('modalImg').src = '';
}

function addToCart(id){
  const p = posters.find(x=>x.id===id);
  alert(`Added "${p.title}" to cart (demo). Final price: ₹${p.discountPrice}`);
}
