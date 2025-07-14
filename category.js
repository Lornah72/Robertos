document.addEventListener('DOMContentLoaded', async () => {

  // ✅ use DIFFERENT name, not "supabase"
  const client = window.supabase.createClient(
    'https://hdukbuwmezqyxzsqgqff.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdWtidXdtZXpxeXh6c3FncWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODU5ODAsImV4cCI6MjA2NTA2MTk4MH0.xxyb5u5cvYPS6LvVD73UJDdVe8nhBGNdS6kmP3hPyYo'
  );

  const urlParams = new URLSearchParams(window.location.search);
  const generalCategoryId = urlParams.get('id');

  const productsContainer = document.getElementById('productsContainer');
  const brandSelect = document.getElementById('brandSelect');
  const subcategorySelect = document.getElementById('subcategorySelect');
  const minPrice = document.getElementById('minPrice');
  const maxPrice = document.getElementById('maxPrice');
  const onSaleCheckbox = document.getElementById('onSaleCheckbox');
  const applyFilters = document.getElementById('applyFilters');

  async function loadFilters() {
    const { data: brands } = await client.from('brands').select('*');
    brands?.forEach(b => {
      const option = document.createElement('option');
      option.value = b.id;
      option.textContent = b.name;
      brandSelect.appendChild(option);
    });

    const { data: categories } = await client.from('categories').select('*');
    categories?.forEach(c => {
      const option = document.createElement('option');
      option.value = c.id;
      option.textContent = c.name;
      subcategorySelect.appendChild(option);
    });
  }

  async function loadProducts(filters = {}) {
    let query = client
      .from('products')
      .select('*')
      .eq('general_category', generalCategoryId);

    if (filters.brand_id) {
      query = query.eq('brand_id', filters.brand_id);
    }
    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id);
    }
    if (filters.minPrice) {
      query = query.gte('retail_price', filters.minPrice);
    }
    if (filters.maxPrice) {
      query = query.lte('retail_price', filters.maxPrice);
    }
    if (filters.onSale) {
      query = query.eq('on_sale', true);
    }

    const { data, error } = await query;

    productsContainer.innerHTML = '';

    if (error) {
      productsContainer.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
      console.error(error);
      return;
    }

    if (!data || data.length === 0) {
      productsContainer.innerHTML = '<p>No products found.</p>';
      return;
    }

    data.forEach(p => {
      const div = document.createElement('div');
      div.className = 'product-card';
      div.innerHTML = `
        <img src="${p.image_url}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p>${p.description || ''}</p>
        <p><strong>KES ${p.retail_price}</strong></p>
      `;
      productsContainer.appendChild(div);
    });
  }

  applyFilters.addEventListener('click', () => {
    const filters = {
      brand_id: brandSelect.value || null,
      category_id: subcategorySelect.value || null,
      minPrice: parseFloat(minPrice.value) || null,
      maxPrice: parseFloat(maxPrice.value) || null,
      onSale: onSaleCheckbox.checked
    };
    loadProducts(filters);
  });

  await loadFilters();
  await loadProducts();
});
