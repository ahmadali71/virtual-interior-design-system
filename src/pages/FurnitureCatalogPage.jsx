import React, { useState } from 'react';
import { useDesign } from '../context/DesignContext';
import { FURNITURE_CATALOG, FURNITURE_CATEGORIES } from '../data/furnitureCatalogData';
import { Search, Plus, ExternalLink, Box, Filter, Check, Star } from 'lucide-react';

export default function FurnitureCatalogPage({ onNavigate }) {
  const { addFurniture } = useDesign();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedItemId, setAddedItemId] = useState(null);

  const filteredCatalog = FURNITURE_CATALOG.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.style.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = (item) => {
    addFurniture(item);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Furniture & Décor Catalog</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Browse curated 3D furnishings, dimensional specifications, and real-time vendor pricing.
          </p>
        </div>

        <button
          onClick={() => onNavigate('studio-3d')}
          className="btn-primary"
          style={{ padding: '8px 18px', fontSize: '13px' }}
        >
          <Box size={16} /> Open 3D Studio
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="vids-card" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search sofas, tables, chandeliers, velvet, oak, or styles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', paddingLeft: '40px' }}
          />
          <Search size={18} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {FURNITURE_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                background: selectedCategory === cat ? 'var(--primary)' : 'var(--bg-main)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-main)',
                border: '1px solid var(--border)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid-3">
        {filteredCatalog.map((item) => (
          <div
            key={item.id}
            className="vids-card"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="vids-badge badge-primary" style={{ fontSize: '11px', marginBottom: '6px' }}>
                  {item.category}
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{item.name}</h3>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)' }}>
                ${item.price}
              </div>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              {item.description}
            </p>

            {/* Spec details */}
            <div style={{
              background: 'var(--bg-main)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              fontSize: '11px',
              display: 'flex',
              justifyContent: 'space-between',
              color: 'var(--text-muted)'
            }}>
              <div>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Dimensions: </span>
                {item.dimensions.width}m W × {item.dimensions.depth}m D × {item.dimensions.height}m H
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f59e0b', fontWeight: 700 }}>
                <Star size={12} fill="#f59e0b" /> {item.rating}
              </div>
            </div>

            {/* Available colors */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Colors:</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {item.colors.map(c => (
                  <div
                    key={c}
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: c,
                      border: '1px solid #cbd5e1'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Vendor link and Add to 3D */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px' }}>
              <a
                href="#vendor"
                onClick={(e) => { e.preventDefault(); alert(`Redirecting to vendor partner: ${item.vendor}`); }}
                style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>{item.vendor}</span>
                <ExternalLink size={12} />
              </a>

              <button
                onClick={() => handleAddItem(item)}
                className={addedItemId === item.id ? 'btn-secondary' : 'btn-primary'}
                style={{
                  padding: '6px 14px',
                  fontSize: '12px',
                  background: addedItemId === item.id ? '#d1fae5' : undefined,
                  color: addedItemId === item.id ? '#065f46' : undefined
                }}
              >
                {addedItemId === item.id ? (
                  <>
                    <Check size={14} /> Added!
                  </>
                ) : (
                  <>
                    <Plus size={14} /> Add to 3D
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
