import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

const ProductComponent = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <h2 className="title">Or subscribe to the newsletter</h2>

      {/* products card */}
      <div>
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* All */}

          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button onClick={() => showAll()}>All Products</button>
            
              <button
                // key={item._id}
                // value={item._id}
                // onClick={() => filterItems(item.name)}
              >
                {/* {item.name} */}
              </button>
            {/* ))} */}
          </div>

          {/* Sort option */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <FaFilter className="text-white h-4 w-4" />
            </div>

            <select
              id="sort"
              className="bg-black text-white px-2 py-1 rounded-sm"
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* products card */}
        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-center gap-12 shadow-sm">
          
          
        </div>
      </div>
    </div>
    // <div class="grid grid-cols-4 gap-4">
    //   <div className="p-10">
    //     <Card
    //       hoverable
    //       style={{
    //         width: 260,
    //       }}
    //       cover={
    //         <img
    //           alt="example"
    //           src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
    //         />
    //       }
    //     >
    //       <Meta title="Europe Street beat" description="www.instagram.com" />
    //     </Card>
    //   </div>
    // </div>
  );
};

export default ProductComponent;
