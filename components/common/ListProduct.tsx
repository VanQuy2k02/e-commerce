'use client';
import { list_products } from '@/constants/products';
import { handleProduct } from '@/service/product';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ParamsProps {
  page?: number;
  limit?: number;
  category?: string;
  supplier?: string;
  orderBy?: string;
  order?: string;
  hideOutOfStock?: string;
  minPrice?: number;
  maxPrice?: number;
}
export default function ListProduct({
  page,
  limit,
  category,
  supplier,
  orderBy,
  order,
  hideOutOfStock,
  minPrice,
  maxPrice,
}: ParamsProps) {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    const loadingDataProduct = async () => {
      const res = await handleProduct.getProduct({
        page,
        limit,
        category,
        supplier,
        orderBy,
        order,
        hideOutOfStock,
        minPrice,
        maxPrice,
      });
      setProduct(res.products);
    };
    loadingDataProduct();
  }, [page, limit, category, supplier, orderBy, order, hideOutOfStock, minPrice, maxPrice]);
  console.log(products, 'products');

  return (
    <div className="px-4 w-[908px]">
      <h2 className="mt-4 mb-2 text-1c text-18 font-bold leading-height-23">List Product</h2>
      <div className="flex flex-col items-center">
        <ul className="py-3 grid grid-cols-5 gap-3">
          {list_products.length > 0 &&
            list_products.map((item, index) => (
              <li key={index}>
                <Image src={item.image} alt={item.name} width={166} height={221} />
                <div className="mt-3 mb-9">
                  <p className="text-1c font-medium leading-6">{item.name}</p>
                  <p className="text-14 text-9c font-normal leading-height-21">{item.price}</p>
                </div>
              </li>
            ))}
        </ul>
        <Pagination className="my-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
