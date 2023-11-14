"use client";

import { Sidebar } from "flowbite-react";
import { useParams } from "next/navigation";
import { VscGraph } from "react-icons/vsc";
import { FaRegImages } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { CiShoppingTag } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { TbBat } from "react-icons/tb";
import {
  AiOutlineShoppingCart,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { LiaCartPlusSolid } from "react-icons/lia";
import { TbApi } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";

const ContentSeparator = () => {
  const params = useParams();

  return (
    <div className="h-screen sticky top-0">
      <Sidebar aria-label="Sidebar" className="z-2">
        <div className="flex flex-row">
        <div>
            <TbBat size={30} />
          </div>
          <div>
            <Sidebar.Logo href="#" img="">
              BatVault
            </Sidebar.Logo>
          </div>
        </div>
        <Sidebar.Items className="mt-10">
          <Sidebar.ItemGroup>
            {/* <Sidebar.Item href={`/${params.storeId}`} icon={HiChartPie}>
            <div>
              <StoreSwitcher items={stores} />
            </div>
          </Sidebar.Item> */}
            <Sidebar.Item href={`/${params.storeId}`} icon={VscGraph}>
              <p>Dashboard</p>
            </Sidebar.Item>
            <Sidebar.Item
              href={`/${params.storeId}/placards`}
              icon={FaRegImages}
            >
              <p>Billboards</p>
            </Sidebar.Item>

            <Sidebar.Collapse icon={FiShoppingBag} label="Products">
              <Sidebar.Item
                href={`/${params.storeId}/products`}
                icon={CiShoppingTag}
              >
                All Products
              </Sidebar.Item>
              <Sidebar.Item
                href={`/${params.storeId}/categories`}
                icon={MdOutlineCategory}
              >
                Categories
              </Sidebar.Item>
              {/* <Sidebar.Item
                href={`/${params.storeId}/sizes`}
                icon={IoMdResize}
              >
                Sizes
              </Sidebar.Item>
              <Sidebar.Item
                href={`/${params.storeId}/colors`}
                icon={MdOutlineColorLens}
              >
                Colors
              </Sidebar.Item> */}
            </Sidebar.Collapse>

            <Sidebar.Collapse icon={AiOutlineShoppingCart} label="Orders">
              <Sidebar.Item
                href={`/${params.storeId}/orders`}
                icon={LiaCartPlusSolid}
              >
                All Orders
              </Sidebar.Item>
              <Sidebar.Item
                href={`/${params.storeId}/orders/drafts`}
                icon={AiOutlineLoading3Quarters}
              >
                In process
              </Sidebar.Item>
              <Sidebar.Item
                href={`/${params.storeId}/orders/sold`}
                icon={BsCashCoin}
              >
                Sold
              </Sidebar.Item>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup className="">
            <Sidebar.Item
              href={`/${params.storeId}/api-reference`}
              icon={TbApi}
            >
              <p>API Reference</p>
            </Sidebar.Item>
            <Sidebar.Item
              href={`/${params.storeId}/settings`}
              icon={FiSettings}
            >
              <p>Store Settings</p>
            </Sidebar.Item>
            {/* <div className="absolute bottom-0">
              <Sidebar.Item>
                <UserButton afterSignOutUrl="/" />
              </Sidebar.Item>
            </div> */}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default ContentSeparator;
