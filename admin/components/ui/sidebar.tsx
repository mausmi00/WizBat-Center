"use client";

import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { BiBuoy } from "react-icons/bi";
import { redirect, useParams } from "next/navigation";
import StoreSwitcher from "../store-switcher";
import prismadb from "@/lib/prismadb";
import { UserButton, auth } from "@clerk/nextjs";

const ContentSeparator = () => {
  const params = useParams();

  return (
    <div className="top-0 z-2 sticky h-screen">
      <Sidebar aria-label="Sidebar">
        <Sidebar.Logo href="#" img="">
          Shushhopify
        </Sidebar.Logo>
        <Sidebar.Items className="mt-10">
          <Sidebar.ItemGroup>
            {/* <Sidebar.Item href={`/${params.storeId}`} icon={HiChartPie}>
            <div>
              <StoreSwitcher items={stores} />
            </div>
          </Sidebar.Item> */}
            <Sidebar.Item href={`/${params.storeId}`} icon={HiChartPie}>
              <p>Dashboard</p>
            </Sidebar.Item>
            <Sidebar.Item
              href={`/${params.storeId}/billboards`}
              icon={HiViewBoards}
            >
              <p>Billboards</p>
            </Sidebar.Item>

            <Sidebar.Collapse icon={HiShoppingBag} label="Products">
              <Sidebar.Item href={`/${params.storeId}/products`} icon={HiInbox}>
                All Products
              </Sidebar.Item>
              <Sidebar.Item
                href={`/${params.storeId}/categories`}
                icon={HiUser}
              >
                Categories
              </Sidebar.Item>
              <Sidebar.Item
                href={`/${params.storeId}/sizes`}
                icon={HiShoppingBag}
              >
                Sizes
              </Sidebar.Item>
              <Sidebar.Item
                href={`/${params.storeId}/colors`}
                icon={HiArrowSmRight}
              >
                Colors
              </Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Collapse icon={HiShoppingBag} label="Orders">
              <Sidebar.Item href={`/${params.storeId}/orders`} icon={HiTable}>
                All Orders
              </Sidebar.Item>
              <Sidebar.Item
                href={`/${params.storeId}/drafts`}
                icon={HiChartPie}
              >
                In process
              </Sidebar.Item>
              <Sidebar.Item
                href={`/${params.storeId}/sold`}
                icon={HiViewBoards}
              >
                Sold
              </Sidebar.Item>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup className="absolute bottom-1">
            <Sidebar.Item
              href={`/${params.storeId}/api-reference`}
              icon={BiBuoy}
            >
              <p>API Reference</p>
            </Sidebar.Item>
            <Sidebar.Item href={`/${params.storeId}/settings`} icon={BiBuoy}>
              <p>Store Settings</p>
            </Sidebar.Item>
            <Sidebar.Item>
              <UserButton afterSignOutUrl="/" />
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default ContentSeparator;
