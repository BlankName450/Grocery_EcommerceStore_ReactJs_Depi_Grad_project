import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

function AdminProductManagement() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const weightUnits = ['g', 'kg', 'ml', 'L', 'pcs'];
  const categories = ['Vegetables','Fish & Meat','Dairy','Bakery & Pastry','Snacks & Beverages','Organic'];

const categorySubcategories = {
  'Vegetables': ['Leafy Greens', 'Root Vegetables', 'Herbs', 'Packaged'],
  'Fish & Meat': ['Seafood', 'Red Meat', 'Poultry', 'Cold Cuts', 'Sausage', 'Ground Meat', 'Pork', 'Plant-Based'],
  'Dairy': ['Milk', 'Cheese', 'Yogurt', 'Eggs', 'Cottage Cheese'],
  'Bakery & Pastry': ['Breads', 'Cakes', 'Croissants', 'Muffins', 'Pastries', 'Pies', 'Buns'],
  'Snacks & Beverages': ['Juices', 'Chips', 'Energy Bars', 'Drinks', 'Coffee & Tea', 'Sweets & Chocolate', 'Pantry'],
  'Organic': ['Honey & Syrups', 'Cooking Oils', 'Spices & Seasonings', 'Vinegars']
};

  const [formData, setFormData] = useState({
    title:'', price:'', category:'', subcategory:'', short_description:'', weight:'', images:[]
  });
  const [weightUnit, setWeightUnit] = useState('g');
  const [imageUrls, setImageUrls] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [editFormData, setEditFormData] = useState({
    title:'', price:'', category:'', subcategory:'', short_description:'', weight:'', images:[]
  });
  const [editWeightUnit, setEditWeightUnit] = useState('g');
  const [editImageUrls, setEditImageUrls] = useState('');
  const [editSelectedFiles, setEditSelectedFiles] = useState([]);

  // ------------------- FETCH PRODUCTS -------------------
  useEffect(() => {
    let cancelled = false;
    const loadProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        if (!cancelled) setProducts(Array.isArray(data)?data:[]);
      } catch(err){console.error(err);}
    };
    loadProducts();
    return () => { cancelled = true; };
  }, []);

  // ------------------- FORM HANDLERS -------------------
  const handleInputChange = e => {
    const {name,value} = e.target;
    if(name==='category'){
      setFormData(prev=>({...prev,[name]:value, subcategory:''}));
    }else setFormData(prev=>({...prev,[name]:value}));
  };
  const handleEditInputChange = e => {
    const {name,value} = e.target;
    if(name==='category'){
      setEditFormData(prev=>({...prev,[name]:value, subcategory:''}));
    }else setEditFormData(prev=>({...prev,[name]:value}));
  };

  const handleTitleChange = e=>{setFormData(prev=>({...prev,title:e.target.value.replace(/[^a-zA-Z\s'-]/g,'')}))};
  const handleEditTitleChange = e=>{setEditFormData(prev=>({...prev,title:e.target.value.replace(/[^a-zA-Z\s'-]/g,'')}))};

  const handlePriceChange = e=>{setFormData(prev=>({...prev,price:e.target.value.replace(/[^\d.]/g,'')}))};
  const handleEditPriceChange = e=>{setEditFormData(prev=>({...prev,price:e.target.value.replace(/[^\d.]/g,'')}))};

  const handleWeightChange = e=>{setFormData(prev=>({...prev,weight:e.target.value.replace(/[^\d.]/g,'')}))};
  const handleEditWeightChange = e=>{setEditFormData(prev=>({...prev,weight:e.target.value.replace(/[^\d.]/g,'')}))};

  const handleWeightUnitChange = e=>{setWeightUnit(e.target.value)};
  const handleEditWeightUnitChange = e=>{setEditWeightUnit(e.target.value)};

  const handleImageUrlsChange = e=>{
    const urls = e.target.value.split(',').map(url=>url.trim()).filter(url=>url);
    setImageUrls(e.target.value);
    setFormData(prev=>({...prev,images:urls}));
  };
  const handleEditImageUrlsChange = e=>{
    const urls = e.target.value.split(',').map(url=>url.trim()).filter(url=>url);
    setEditImageUrls(e.target.value);
    setEditFormData(prev=>({...prev,images:urls}));
  };

  const handleFileChange = e=>setSelectedFiles(Array.from(e.target.files));
  const handleEditFilesChange = e=>setEditSelectedFiles(Array.from(e.target.files));

  const resetForm = ()=>{
    setFormData({title:'', price:'', category:'', subcategory:'', short_description:'', weight:'', images:[]});
    setWeightUnit('g'); setImageUrls(''); setSelectedFiles([]); setShowForm(false);
  };

  // ------------------- ADD PRODUCT -------------------
  const generateId = (title, weight) => {
    const titlePart = String(title||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
    const weightPart = String(weight||'').toLowerCase().replace(/\s+/g,'');
    return `${titlePart}-${weightPart}`;
  };

  const handleSubmit = async e=>{
    e.preventDefault();
    if(!formData.title || !formData.price || !formData.category || !formData.subcategory || !formData.short_description || !formData.weight) return alert('Fill all required fields');

    const weightCombined = `${formData.weight}${weightUnit}`;
    const id = generateId(formData.title, weightCombined);
    const formattedPrice = formData.price.includes('EGP')?formData.price:formData.price+' EGP';

    try{
      let saved;
      if(selectedFiles.length>0){
        const fd = new FormData();
        fd.append('id',id);
        fd.append('title',formData.title);
        fd.append('price',formattedPrice);
        fd.append('category',formData.category);
        fd.append('subcategory',formData.subcategory);
        fd.append('short_description',formData.short_description);
        fd.append('weight',weightCombined);
        selectedFiles.forEach(f=>fd.append('images',f));
        const res = await fetch('http://localhost:5000/api/products',{method:'POST',body:fd});
        saved = await res.json();
      } else {
        const payload = {id, title:formData.title, price:formattedPrice, category:formData.category, subcategory:formData.subcategory, short_description:formData.short_description, weight:weightCombined, images:formData.images};
        const res = await fetch('http://localhost:5000/api/products',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
        saved = await res.json();
      }
      setProducts(prev=>[...prev,saved]);
      resetForm();
    }catch(err){console.error(err);}
  };

  // ------------------- EDIT PRODUCT -------------------
  const handleEdit = product=>{
    setEditingProduct(product);
    const priceWithoutEGP = product.price?.replace(/\s*EGP\s*/gi,'').trim()||'';
    const weightMatch = product.weight?.match(/^(\d+(?:\.\d+)?)(g|kg|ml|L|pcs)$/i);
    setEditWeightUnit(weightMatch?weightMatch[2]:'g');
    setEditFormData({title:product.title||'', price:priceWithoutEGP, category:product.category||'', subcategory:product.subcategory||'', short_description:product.short_description||'', weight:weightMatch?weightMatch[1]:'', images:product.images||[]});
    setEditImageUrls(product.images?.join(', ')||'');
    setShowEditModal(true);
  };

  const handleEditSubmit = async e=>{
    e.preventDefault();
    if(!editingProduct) return;

    const fd = new FormData();
    fd.append('price', editFormData.price);
    fd.append('category', editFormData.category);
    fd.append('subcategory', editFormData.subcategory);
    fd.append('short_description', editFormData.short_description);
    fd.append('imagesJson', JSON.stringify(Array.isArray(editFormData.images)?editFormData.images:[]));
    editSelectedFiles.forEach(f=>fd.append('images',f));

    try{
      const res = await fetch(`http://localhost:5000/api/products/${encodeURIComponent(editingProduct.id)}`,{method:'PUT',body:fd});
      const updated = await res.json();
      setProducts(prev=>prev.map(p=>p.id===updated.id?updated:p));
      setShowEditModal(false); setEditSelectedFiles([]);
    }catch(err){console.error(err);}
  };

  const handleDelete = async id=>{
    if(!window.confirm('Are you sure?')) return;
    try{
      const res = await fetch(`http://localhost:5000/api/products/${encodeURIComponent(id)}`,{method:'DELETE'});
      if(res.ok)setProducts(prev=>prev.filter(p=>p.id!==id));
    }catch(err){console.error(err);}
  };

  const handleCloseEditModal = ()=>{
    setShowEditModal(false); setEditingProduct(null); setEditFormData({title:'', price:'', category:'', subcategory:'', short_description:'', weight:'', images:[]});
    setEditWeightUnit('g'); setEditImageUrls(''); setEditSelectedFiles([]);
  };

  return (
    <div className="min-vh-100 bg-light">
      <AdminNavbar />
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Product Management</h2>
          <button className="btn btn-primary" onClick={()=>setShowForm(true)}>
            <FontAwesomeIcon icon={faPlus} className="me-2"/>Add New Product
          </button>
        </div>

        {/* ADD FORM */}
        {showForm && (
          <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Add New Product</h5>
              <button className="btn btn-sm btn-light" onClick={resetForm}><FontAwesomeIcon icon={faTimes}/></button>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Title *</label>
                  <input type="text" className="form-control" value={formData.title} onChange={handleTitleChange} required/>
                </div>

                <div className="mb-3 d-flex gap-2">
                  {/* Price */}
                  <div className="flex-fill">
                    <label>Price *</label>
                    <div className="input-group">
                      <input type="text" className="form-control form-control-sm" value={formData.price} onChange={handlePriceChange} required/>
                      <input type="text" className="form-control form-control-sm" value="EGP" disabled style={{maxWidth:'60px'}}/>
                    </div>
                  </div>
                  {/* Weight */}
                  <div className="flex-fill">
                    <label>Weight *</label>
                    <div className="input-group">
                      <input type="text" className="form-control form-control-sm" value={formData.weight} onChange={handleWeightChange} required/>
                      <select className="form-select form-select-sm" value={weightUnit} onChange={handleWeightUnitChange} style={{maxWidth:'80px'}}>
                        {weightUnits.map(u=><option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Category *</label>
                    <select className="form-select" value={formData.category} name="category" onChange={handleInputChange} required>
                      <option value="">Select</option>{categories.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>Subcategory *</label>
                    {formData.category ? (
                      <select className="form-select" name="subcategory" value={formData.subcategory} onChange={handleInputChange} required>
                        <option value="">Select</option>
                        {categorySubcategories[formData.category]?.map(sc=><option key={sc} value={sc}>{sc}</option>)}
                      </select>
                    ):(<input type="text" className="form-control" placeholder="Select category first" disabled/>)}
                  </div>
                </div>

                <div className="mb-3">
                  <label>Short Description *</label>
                  <textarea name="short_description" className="form-control" rows="3" value={formData.short_description} onChange={handleInputChange} required/>
                </div>

                <div className="mb-3">
                  <label>Image URLs (comma-separated)</label>
                  <input type="text" className="form-control" value={imageUrls} onChange={handleImageUrlsChange} placeholder="https://example.com/image1.jpg"/>
                </div>

                <div className="mb-3">
                  <label>Upload Images</label>
                  <input type="file" className="form-control" multiple accept="image/*" onChange={handleFileChange}/>
                </div>

                <button type="submit" className="btn btn-primary me-2">Add Product</button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {/* PRODUCTS LIST */}
        <div className="row">
          {products.length===0?(<div className="alert alert-info">No products found</div>):
            products.map(p=>(
              <div key={p.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  {p.images?.[0] && <img src={p.images[0]} alt={p.title} className="card-img-top" style={{height:'200px',objectFit:'cover'}} onError={e=>e.target.src='https://via.placeholder.com/300x200?text=No+Image'}/>}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="text-muted mb-1"><strong>Price:</strong> {p.price} EGP</p>
                    <p className="text-muted mb-1"><strong>Weight:</strong> {p.weight}</p>
                    <p className="text-muted mb-1"><strong>Category:</strong> {p.category}</p>
                    {p.subcategory && <p className="text-muted mb-1"><strong>Subcategory:</strong> {p.subcategory}</p>}
                    {p.short_description && <p className="card-text text-muted small mb-auto">{p.short_description}</p>}
                    <div className="mt-3 d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary flex-fill" onClick={()=>handleEdit(p)}><FontAwesomeIcon icon={faEdit}/> Edit</button>
                      <button className="btn btn-sm btn-outline-danger flex-fill" onClick={()=>handleDelete(p.id)}><FontAwesomeIcon icon={faTrash}/> Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* EDIT MODAL */}
      {showEditModal && editingProduct && (
        <div className="modal show d-block" style={{backgroundColor:'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseEditModal}></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-warning">Title and Weight cannot be edited to avoid ID conflicts</div>
                <form onSubmit={handleEditSubmit}>
                  <div className="mb-3">
                    <label>Title *</label>
                    <input type="text" className="form-control" value={editFormData.title} disabled/>
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <div className="flex-fill">
                      <label>Price *</label>
                      <div className="input-group">
                        <input type="text" className="form-control form-control-sm" value={editFormData.price} onChange={handleEditPriceChange} required/>
                        <input type="text" className="form-control form-control-sm" value="EGP" disabled style={{maxWidth:'60px'}}/>
                      </div>
                    </div>
                    <div className="flex-fill">
                      <label>Weight *</label>
                      <div className="input-group">
                                                <input type="text" className="form-control form-control-sm" value={editFormData.weight} disabled/>
                        <select className="form-select form-select-sm" value={editWeightUnit} onChange={handleEditWeightUnitChange} style={{maxWidth:'80px'}} disabled>
                          {weightUnits.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label>Category *</label>
                      <select className="form-select" value={editFormData.category} name="category" onChange={handleEditInputChange} required>
                        <option value="">Select</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>Subcategory *</label>
                      {editFormData.category ? (
                        <select className="form-select" name="subcategory" value={editFormData.subcategory} onChange={handleEditInputChange} required>
                          <option value="">Select</option>
                          {categorySubcategories[editFormData.category]?.map(sc => <option key={sc} value={sc}>{sc}</option>)}
                        </select>
                      ) : (<input type="text" className="form-control" placeholder="Select category first" disabled/>)}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label>Short Description *</label>
                    <textarea name="short_description" className="form-control" rows="3" value={editFormData.short_description} onChange={handleEditInputChange} required/>
                  </div>

                  <div className="mb-3">
                    <label>Image URLs (comma-separated)</label>
                    <input type="text" className="form-control" value={editImageUrls} onChange={handleEditImageUrlsChange} placeholder="https://example.com/image1.jpg"/>
                  </div>

                  <div className="mb-3">
                    <label>Upload New Images</label>
                    <input type="file" className="form-control" multiple accept="image/*" onChange={handleEditFilesChange}/>
                  </div>

                  <button type="submit" className="btn btn-primary me-2">Save Changes</button>
                  <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProductManagement;

