// app/admin/products/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { productUpdateSchema, type ProductUpdateInput } from '@/schemas/product';
import { useForm, Controller } from 'react-hook-form';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Plus, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';


interface Category {
  _id: string;
  name: string;
}

interface ProductEditPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductEditPage({ params }: ProductEditPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>(['']);
  const [productId, setProductId] = useState<string>('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
    reset
  } = useForm<ProductUpdateInput>({
    resolver: zodResolver(productUpdateSchema),
    defaultValues: {
      isActive: true,
      isFeatured: false,
    }
  });

    // Watch checkbox values
    const isActive = watch('isActive');
    const isFeatured = watch('isFeatured');

  // Load product data and categories
  useEffect(() => {
    const loadData = async () => {
      try {
        const resolvedParams = await params;
        setProductId(resolvedParams.id);

        // Fetch categories
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.categories || []);

        // Fetch product data
        const productResponse = await fetch(`/api/products/${resolvedParams.id}`);
        const productData = await productResponse.json();

        if (!productResponse.ok) {
          throw new Error(productData.error || 'Failed to load product');
        }

        const product = productData.product;

        reset({
          name: product.name,
          description: product.description,
          shortDescription: product.shortDescription || '',
          price: product.price,
          comparePrice: product.comparePrice,
          category: product.category._id,
          quantity: product.quantity,
          isActive: product.isActive,
          isFeatured: product.isFeatured,
          images: product.images || [],
          tags: product.tags || [],
          variants: product.variants || []
        });

        // Set images and tags for UI
        setImageUrls(product.images.length > 0 ? product.images : ['']);
        setTags(product.tags.length > 0 ? product.tags : ['']);

        // Set form values
        setValue('name', product.name);
        setValue('description', product.description);
        setValue('shortDescription', product.shortDescription || '');
        setValue('price', product.price);
        setValue('comparePrice', product.comparePrice);
        setValue('category', product.category._id);
        setValue('quantity', product.quantity);
        setValue('isActive', product.isActive);
        setValue('isFeatured', product.isFeatured);

        // Set images and tags
        setImageUrls(product.images.length > 0 ? product.images : ['']);
        setTags(product.tags.length > 0 ? product.tags : ['']);
        setValue('images', product.images);
        setValue('tags', product.tags);
        setValue('variants', product.variants || []);

      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadData();
  // }, [params, setValue, reset]);
  }, [params, reset]);


  const addImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrl = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    setValue('images', newUrls.filter(url => url.trim() !== ''));
  };

  const updateImageUrl = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
    setValue('images', newUrls.filter(url => url.trim() !== ''));
  };

  const addTag = () => {
    setTags([...tags, '']);
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setValue('tags', newTags.filter(tag => tag.trim() !== ''));
  };

  const updateTag = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
    setValue('tags', newTags.filter(tag => tag.trim() !== ''));
  };

  const onSubmit = async (data: ProductUpdateInput) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update product');
      }

      setSuccess('Product updated successfully!');
      
      // Redirect to product view after 2 seconds
      setTimeout(() => {
        router.push(`/admin/products/${productId}`);
      }, 2000);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <AdminLayout title="Edit Product">
        <div className="flex items-center justify-center min-h-96">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Product">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Link href={`/admin/products/${productId}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Product
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold">Edit Product</h2>
            <p className="text-gray-600">Update product information</p>
          </div>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Product Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Essential product details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="Enter product name"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Input
                      id="shortDescription"
                      {...register('shortDescription')}
                      placeholder="Brief product description"
                      className={errors.shortDescription ? 'border-red-500' : ''}
                    />
                    {errors.shortDescription && (
                      <p className="text-sm text-red-500 mt-1">{errors.shortDescription.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description">Full Description</Label>
                    <Textarea
                      id="description"
                      {...register('description')}
                      placeholder="Detailed product description"
                      rows={4}
                      className={errors.description ? 'border-red-500' : ''}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category._id} value={category._id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>Update product images (URLs)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={url}
                        onChange={(e) => updateImageUrl(index, e.target.value)}
                        placeholder="Enter image URL"
                        className="flex-1"
                      />
                      {imageUrls.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeImageUrl(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addImageUrl}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Image
                  </Button>
                  {errors.images && (
                    <p className="text-sm text-red-500">{errors.images.message}</p>
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                  <CardDescription>Update tags for better searchability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tags.map((tag, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={tag}
                        onChange={(e) => updateTag(index, e.target.value)}
                        placeholder="Enter tag"
                        className="flex-1"
                      />
                      {tags.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTag(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTag}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Tag
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      {...register('price', { valueAsNumber: true })}
                      placeholder="0.00"
                      className={errors.price ? 'border-red-500' : ''}
                    />
                    {errors.price && (
                      <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="comparePrice">Compare Price (₹)</Label>
                    <Input
                      id="comparePrice"
                      type="number"
                      step="0.01"
                      {...register('comparePrice', { valueAsNumber: true })}
                      placeholder="0.00"
                      className={errors.comparePrice ? 'border-red-500' : ''}
                    />
                    {errors.comparePrice && (
                      <p className="text-sm text-red-500 mt-1">{errors.comparePrice.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Inventory */}
              <Card>
                <CardHeader>
                  <CardTitle>Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      {...register('quantity', { valueAsNumber: true })}
                      placeholder="0"
                      className={errors.quantity ? 'border-red-500' : ''}
                    />
                    {errors.quantity && (
                      <p className="text-sm text-red-500 mt-1">{errors.quantity.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="isActive"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="isActive"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="isActive">Active Product</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Controller
                      name="isFeatured"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="isFeatured"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="isFeatured">Featured Product</Label>
                  </div>

                  {/* Visual feedback */}
                  <div className="text-sm text-gray-600">
                    <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
                    <p>Featured: {isFeatured ? 'Yes' : 'No'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-2">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Product'
                  )}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push(`/admin/products/${productId}`)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
