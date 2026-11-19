import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Upload, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Loader2,
  Image as ImageIcon,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { PageBanner } from '@/components/common/PageBanner';

interface UploadedFileItem {
  file: File;
  previewUrl: string;
  id: string;
}

interface FormState {
  fullName: string;
  brandName: string;
  email: string;
  whatsapp: string;
  productCategory: string;
  productCount: string;
  preferredStyle: string;
  projectBudget: string;
  imagesRequired: string;
  creativeInstructions: string;
}

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Fields
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    brandName: '',
    email: '',
    whatsapp: '',
    productCategory: 'Cosmetics & Skincare',
    productCount: '1 Product',
    preferredStyle: 'Studio Podiums & Pedestals',
    projectBudget: '₹2,499 (Brand Package)',
    imagesRequired: '10 Images',
    creativeInstructions: '',
  });

  // Pre-fill package if passed via query param
  useEffect(() => {
    const pkg = searchParams.get('package');
    const service = searchParams.get('service');
    if (pkg) {
      if (pkg === 'essential') {
        setFormData(prev => ({
          ...prev,
          projectBudget: '₹1,499 (Essential Package)',
          imagesRequired: '5 Images',
          productCount: '1 Product'
        }));
      } else if (pkg === 'brand') {
        setFormData(prev => ({
          ...prev,
          projectBudget: '₹2,499 (Brand Package)',
          imagesRequired: '10 Images',
          productCount: '1 Product'
        }));
      } else if (pkg === 'growth') {
        setFormData(prev => ({
          ...prev,
          projectBudget: '₹4,499 (Growth Package)',
          imagesRequired: '20 Images',
          productCount: 'Up to 3 Products'
        }));
      } else if (pkg === 'custom-campaign') {
        setFormData(prev => ({
          ...prev,
          projectBudget: 'Custom Quote (₹6,999+)',
          imagesRequired: '30+ Images',
          productCount: 'Multiple Products'
        }));
      }
    }
    if (service) {
      setFormData(prev => ({
        ...prev,
        preferredStyle: service
      }));
    }
  }, [searchParams]);

  // Uploaded Files State
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Accept all image types: PNG, JPG, JPEG, WEBP, HEIC, TIFF, BMP, AVIF, GIF
  const MAX_FILES = 50;
  const MAX_SIZE_MB = 30;

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name.';
    if (!formData.brandName.trim()) errors.brandName = 'Please enter your brand or business name.';
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.whatsapp.trim()) {
      errors.whatsapp = 'Please enter your WhatsApp contact number.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileProcess = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setFileError(null);

    const newFiles: UploadedFileItem[] = [];
    const currentCount = uploadedFiles.length;

    if (currentCount + files.length > MAX_FILES) {
      setFileError(`You can upload a maximum of ${MAX_FILES} photos. (You currently have ${currentCount})`);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Accept any image format (png, jpg, webp, heic, gif, tiff, svg, avif) or files with image extension
      const isImage = file.type.startsWith('image/') || /\.(png|jpe?g|webp|heic|tiff?|bmp|gif|avif)$/i.test(file.name);

      if (!isImage) {
        setFileError(`"${file.name}" is not a recognized image file. Please upload images.`);
        return;
      }

      // Validate size (30 MB per file)
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setFileError(`"${file.name}" exceeds the maximum ${MAX_SIZE_MB} MB file size limit.`);
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      newFiles.push({
        file,
        previewUrl,
        id: `${file.name}-${Date.now()}-${i}`,
      });
    }

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const target = prev.find(item => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFileProcess(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Upload each image through /api/upload
      // Uploading one-by-one keeps each request small (~2MB) and bypasses CORS & Vercel's 4.5MB ceiling!
      const directImageLinks: { name: string; url: string }[] = [];

      if (uploadedFiles.length > 0) {
        for (let i = 0; i < uploadedFiles.length; i++) {
          const item = uploadedFiles[i];
          setUploadProgress(`Uploading photo ${i + 1} of ${uploadedFiles.length}: ${item.file.name}...`);

          let uploadedUrl: string | null = null;
          for (let attempt = 1; attempt <= 2 && !uploadedUrl; attempt++) {
            try {
              const uploadData = new FormData();
              uploadData.append('file', item.file, item.file.name);

              const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadData,
              });

              if (res.ok) {
                const data = await res.json();
                if (data?.url) {
                  uploadedUrl = data.url;
                  directImageLinks.push({
                    name: item.file.name,
                    url: data.url,
                  });
                }
              }
            } catch (uploadErr) {
              console.warn(`Upload attempt ${attempt} error for file:`, item.file.name, uploadErr);
            }
          }
        }
      }

      if (uploadedFiles.length > 0 && directImageLinks.length === 0) {
        setSubmitError(
          'Could not upload reference photos. Please check your connection and try submitting again.'
        );
        setIsSubmitting(false);
        setUploadProgress(null);
        return;
      }

      setUploadProgress('Sending Enquiry Details...');

      // Step 2: Send clean JSON payload with image URLs to /api/contact
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          brandName: formData.brandName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          productCategory: formData.productCategory,
          productCount: formData.productCount,
          preferredStyle: formData.preferredStyle,
          projectBudget: formData.projectBudget,
          imagesRequired: formData.imagesRequired,
          creativeInstructions: formData.creativeInstructions,
          imageLinks: directImageLinks,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        // Success: Clear form & files, show exact thank you message
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          brandName: '',
          email: '',
          whatsapp: '',
          productCategory: 'Cosmetics & Skincare',
          productCount: '1 Product',
          preferredStyle: 'Studio Podiums & Pedestals',
          projectBudget: '₹2,499 (Brand Package)',
          imagesRequired: '10 Images',
          creativeInstructions: '',
        });
        // Revoke preview urls
        uploadedFiles.forEach(f => URL.revokeObjectURL(f.previewUrl));
        setUploadedFiles([]);
        setValidationErrors({});
      } else {
        // Failure: Preserve data, show professional error message
        setSubmitError(
          result.message || 'We could not submit your project enquiry. Please check your connection and try again.'
        );
      }
    } catch (err: any) {
      setSubmitError(
        'A network or server error occurred while sending your enquiry. Please check your internet connection or email us directly at hello@mangaltechstudio.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Top Page Banner */}
      <PageBanner
        badge="Direct Studio Intake"
        title="Start Your"
        highlightedTitle="Project Enquiry"
        description="Share your product details and upload your phone reference photos below. Our creative team will evaluate your items, establish tailored art direction, and prepare your sample proofs."
        bgImageUrl="https://images.unsplash.com/photo-1608248597359-5f25712e52c8?auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Success Alert Banner - SPECIFIED EXACT TEXT */}
        {submitSuccess && (
          <div className="mb-10 bg-evergreen text-white p-6 sm:p-8 rounded-refined border border-copper/30 shadow-xl space-y-3 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-copper flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                Enquiry Successfully Received
              </h3>
            </div>
            <p className="text-sm sm:text-base text-ivory/90 leading-relaxed pl-11">
              Thank you for contacting Mangala Tech Studio! We've received your enquiry and will get back to you soon.
            </p>
            <div className="pl-11 pt-2">
              <button
                onClick={() => setSubmitSuccess(false)}
                className="text-xs text-copper underline hover:text-white"
              >
                Submit another project enquiry
              </button>
            </div>
          </div>
        )}

        {/* Error Alert Banner */}
        {submitError && (
          <div className="mb-10 bg-red-50 text-red-900 p-5 rounded-refined border border-red-200 flex items-start gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <strong className="font-semibold block">Submission Error</strong>
              <p>{submitError}</p>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-refined border border-evergreen/15 shadow-subtle p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Contact Details */}
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-base text-evergreen uppercase tracking-wider pb-2 border-b border-evergreen/10">
                1. Your Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-charcoal block">
                    Full Name <span className="text-copper">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className={`w-full px-3.5 py-2.5 rounded text-sm bg-ivory/40 border transition-all focus:outline-none focus:ring-1 focus:ring-copper ${
                      validationErrors.fullName ? 'border-red-500' : 'border-evergreen/20'
                    }`}
                  />
                  {validationErrors.fullName && (
                    <span className="text-[11px] text-red-600 block">{validationErrors.fullName}</span>
                  )}
                </div>

                {/* Brand / Business Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-charcoal block">
                    Brand / Business Name <span className="text-copper">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brandName}
                    onChange={e => setFormData({ ...formData, brandName: e.target.value })}
                    placeholder="e.g. Aurelia Botanicals"
                    className={`w-full px-3.5 py-2.5 rounded text-sm bg-ivory/40 border transition-all focus:outline-none focus:ring-1 focus:ring-copper ${
                      validationErrors.brandName ? 'border-red-500' : 'border-evergreen/20'
                    }`}
                  />
                  {validationErrors.brandName && (
                    <span className="text-[11px] text-red-600 block">{validationErrors.brandName}</span>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-charcoal block">
                    Email Address <span className="text-copper">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="priya@brandname.com"
                    className={`w-full px-3.5 py-2.5 rounded text-sm bg-ivory/40 border transition-all focus:outline-none focus:ring-1 focus:ring-copper ${
                      validationErrors.email ? 'border-red-500' : 'border-evergreen/20'
                    }`}
                  />
                  {validationErrors.email && (
                    <span className="text-[11px] text-red-600 block">{validationErrors.email}</span>
                  )}
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-charcoal block">
                    WhatsApp Number <span className="text-copper">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded text-sm bg-ivory/40 border transition-all focus:outline-none focus:ring-1 focus:ring-copper ${
                      validationErrors.whatsapp ? 'border-red-500' : 'border-evergreen/20'
                    }`}
                  />
                  {validationErrors.whatsapp && (
                    <span className="text-[11px] text-red-600 block">{validationErrors.whatsapp}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Project Specifications */}
            <div className="space-y-4 pt-2">
              <h3 className="font-heading font-bold text-base text-evergreen uppercase tracking-wider pb-2 border-b border-evergreen/10">
                2. Project Scope & Aesthetic
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Product Category */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-charcoal block">
                    Product Category
                  </label>
                  <select
                    value={formData.productCategory}
                    onChange={e => setFormData({ ...formData, productCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded text-sm bg-ivory/40 border border-evergreen/20 focus:outline-none focus:ring-1 focus:ring-copper"
                  >
                    <option value="Cosmetics & Skincare">Cosmetics & Skincare</option>
                    <option value="Jewellery & Fine Accessories">Jewellery & Fine Accessories</option>
                    <option value="Fashion, Bags & Footwear">Fashion, Bags & Footwear</option>
                    <option value="Food & Packaged Beverages">Food & Packaged Beverages</option>
                    <option value="Home Décor, Ceramics & Candles">Home Décor, Ceramics & Candles</option>
                    <option value="Handmade & Artisanal Crafts">Handmade & Artisanal Crafts</option>
                    <option value="Electronics & Tech Accessories">Electronics & Tech Accessories</option>
                    <option value="Other Product Category">Other Product Category</option>
                  </select>
                </div>

                {/* Number of Products */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-charcoal block">
                    Number of Physical Products / SKUs
                  </label>
                  <select
                    value={formData.productCount}
                    onChange={e => setFormData({ ...formData, productCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded text-sm bg-ivory/40 border border-evergreen/20 focus:outline-none focus:ring-1 focus:ring-copper"
                  >
                    <option value="1 Product">1 Product</option>
                    <option value="2-3 Products">2 - 3 Products</option>
                    <option value="4-6 Products">4 - 6 Products</option>
                    <option value="7-15 Products">7 - 15 Products</option>
                    <option value="16+ Bulk Catalogue">16+ Products (Bulk Catalogue)</option>
                  </select>
                </div>

                {/* Preferred Photography Style */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-charcoal block">
                    Preferred Photography Style
                  </label>
                  <select
                    value={formData.preferredStyle}
                    onChange={e => setFormData({ ...formData, preferredStyle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded text-sm bg-ivory/40 border border-evergreen/20 focus:outline-none focus:ring-1 focus:ring-copper"
                  >
                    <option value="Studio Podiums & Pedestals">Studio Podiums & Pedestals (Architectural/Stone)</option>
                    <option value="Lifestyle Set Compositions">Lifestyle Set Compositions (Living room/Kitchen/Nature)</option>
                    <option value="E-Commerce White / Neutral Catalog">E-Commerce White / Neutral Catalog (Marketplace compliant)</option>
                    <option value="Macro Detail & Texture Zooms">Macro Detail & Texture Zooms (Facets/Ingredients)</option>
                    <option value="Social Media Creative Pack">Social Media Creative Pack (Story & Reel covers)</option>
                    <option value="Custom Thematic Campaign">Custom Thematic Campaign (Seasonal/Festival)</option>
                  </select>
                </div>

                {/* Project Budget Package */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-charcoal block">
                    Project Budget / Selected Package
                  </label>
                  <select
                    value={formData.projectBudget}
                    onChange={e => setFormData({ ...formData, projectBudget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded text-sm bg-ivory/40 border border-evergreen/20 focus:outline-none focus:ring-1 focus:ring-copper"
                  >
                    <option value="₹1,499 (Essential Package)">₹1,499 (Essential Package – 5 Images)</option>
                    <option value="₹2,499 (Brand Package)">₹2,499 (Brand Package – 10 Images)</option>
                    <option value="₹4,499 (Growth Package)">₹4,499 (Growth Package – 20 Images)</option>
                    <option value="Custom Quote (₹6,999+)">Custom Campaign (Starting at ₹6,999)</option>
                  </select>
                </div>

                {/* Number of Images Required */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-charcoal block">
                    Estimated Images Required
                  </label>
                  <select
                    value={formData.imagesRequired}
                    onChange={e => setFormData({ ...formData, imagesRequired: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded text-sm bg-ivory/40 border border-evergreen/20 focus:outline-none focus:ring-1 focus:ring-copper"
                  >
                    <option value="5 Images">5 Images</option>
                    <option value="10 Images">10 Images</option>
                    <option value="20 Images">20 Images</option>
                    <option value="30+ Images">30+ Images</option>
                  </select>
                </div>
              </div>

              {/* Additional Creative Instructions */}
              <div className="space-y-1 pt-2">
                <label className="text-xs font-semibold text-charcoal block">
                  Additional Creative Instructions & Vision
                </label>
                <textarea
                  rows={3}
                  value={formData.creativeInstructions}
                  onChange={e => setFormData({ ...formData, creativeInstructions: e.target.value })}
                  placeholder="Describe your desired mood, lighting tone (e.g. warm sunset, crisp Scandinavian white), background props, or reference links..."
                  className="w-full px-3.5 py-2.5 rounded text-sm bg-ivory/40 border border-evergreen/20 focus:outline-none focus:ring-1 focus:ring-copper leading-relaxed"
                />
              </div>
            </div>

            {/* Section 3: Genuine Working Drag-and-Drop File Upload */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between pb-2 border-b border-evergreen/10">
                <h3 className="font-heading font-bold text-base text-evergreen uppercase tracking-wider">
                  3. Upload Original Product Photographs
                </h3>
                <span className="text-[11px] text-charcoal/60">
                  Bulk uploads supported (up to 50 files &bull; 20 MB each)
                </span>
              </div>

              {/* Drag and drop zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-refined p-8 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-copper bg-copper/5'
                    : 'border-evergreen/25 hover:border-copper/70 bg-ivory/20'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={e => handleFileProcess(e.target.files)}
                />

                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-evergreen/10 text-copper flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-heading font-semibold text-sm text-evergreen">
                      Click to Browse Files
                    </span>
                    <span className="text-xs text-charcoal/70"> or drag and drop your product photos here</span>
                  </div>
                  <p className="text-[11px] text-charcoal/50">
                    Accepts all image formats: PNG, JPG, JPEG, WEBP, HEIC, TIFF (Up to 50 photos &bull; 30MB each)
                  </p>
                </div>
              </div>

              {/* Upload Validation Error Message */}
              {fileError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{fileError}</span>
                </div>
              )}

              {/* Uploaded File Previews & Removal Grid */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-charcoal flex items-center justify-between">
                    <span>Selected References ({uploadedFiles.length}/{MAX_FILES}):</span>
                    <button
                      type="button"
                      onClick={() => {
                        uploadedFiles.forEach(f => URL.revokeObjectURL(f.previewUrl));
                        setUploadedFiles([]);
                      }}
                      className="text-[11px] text-red-600 hover:underline"
                    >
                      Clear All Files
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {uploadedFiles.map((item) => (
                      <div
                        key={item.id}
                        className="relative group rounded border border-evergreen/15 overflow-hidden bg-ivory aspect-square shadow-sm flex flex-col justify-end"
                      >
                        <img
                          src={item.previewUrl}
                          alt={item.file.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* File Name & Size tag */}
                        <div className="relative z-10 bg-charcoal/80 backdrop-blur-sm text-white p-1 text-[9px] truncate">
                          {item.file.name} ({(item.file.size / (1024 * 1024)).toFixed(1)}MB)
                        </div>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(item.id);
                          }}
                          className="absolute top-1 right-1 z-20 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 shadow transition-colors"
                          title="Remove file"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Privacy note */}
            <div className="p-3.5 bg-ivory/60 rounded text-xs text-charcoal/70 flex items-start gap-2 border border-evergreen/10">
              <ShieldCheck className="w-4 h-4 text-copper shrink-0 mt-0.5" />
              <span>
                <strong>Confidentiality Guarantee:</strong> Your uploaded product photographs and branding files are encrypted and processed exclusively for your project enquiry. They will never be uploaded to public galleries without your explicit written approval.
              </span>
            </div>

            {/* Submit Action Button */}
            <div className="pt-4 border-t border-evergreen/10">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-copper hover:bg-copper-hover active:bg-copper-dark text-white font-heading font-semibold py-4 px-6 rounded-refined shadow-subtle hover:shadow-hover transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{uploadProgress || 'Sending Enquiry Details...'}</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Enquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
