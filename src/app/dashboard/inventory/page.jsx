"use client";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryTabs from "@/components/inventory/InventoryTabs";
import LmsHeader from "@/components/lms/LmsHeader";
import OverviewCards from "@/components/lms/OverviewCards";
import Tabs from "@/components/lms/Tabs";
import Spinner from "@/components/loaders/Loader";
import useInventory from "@/hooks/useInventory";
import useResources from "@/hooks/useResource";
import useTraining from "@/hooks/useTraining";
import { Suspense, useEffect } from "react";

const data = [
  {
    id: 1,
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 5,
    unit: "mL",
    concentration: "5%",
    note: "Commonly used as a disinfectant and bleach.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 3,
    id: 2,
    unit: "mL",
    concentration: "10%",
    note: "Effective for removing mineral deposits and rust.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 4,
    id: 3,
    unit: "mL",
    concentration: "25%",
    note: "Used in various cleaning agents and detergents.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    id: 4,
    titrationCount: 2,
    unit: "mL",
    concentration: "70%",
    note: "Widely used as a disinfectant and solvent.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 6,
    id: 5,
    unit: "mL",
    concentration: "5%",
    note: "Vinegar-based cleaner, effective against bacteria and mold.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 4,
    id: 6,
    unit: "mL",
    concentration: "10%",
    note: "Strong base used for cleaning ovens and drains.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 3,
    id: 7,
    unit: "mL",
    concentration: "3%",
    note: "Used as a bleaching agent and disinfectant.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 5,
    id: 8,
    unit: "mL",
    concentration: "50%",
    note: "Effective at removing lime scale and rust stains.",
  },
];

const cleaningTools = [
  {
    name: "Broom",
    description:
      "A tool for sweeping floors, usually consisting of stiff fibers attached to a long handle.",
    quantity: 5,
  },
  {
    name: "Mop",
    description:
      "A tool for washing floors, typically with an absorbent head attached to a long handle.",
    quantity: 10,
  },
  {
    name: "Vacuum Cleaner",
    description:
      "An electrical appliance for cleaning floors, carpets, and upholstery by suction.",
    quantity: 3,
  },
  {
    name: "Dustpan",
    description:
      "A flat container with a handle into which dirt and dust can be swept.",
    quantity: 8,
  },
  {
    name: "Sponge",
    description:
      "A soft, porous material used for washing and cleaning surfaces.",
    quantity: 20,
  },
  {
    name: "Bucket",
    description:
      "A cylindrical container used for holding and carrying water and other liquids.",
    quantity: 6,
  },
  {
    name: "Cleaning Cloth",
    description: "A piece of fabric used for wiping and cleaning surfaces.",
    quantity: 30,
  },
  {
    name: "Detergent",
    description:
      "A cleaning agent, usually in liquid or powder form, used for washing clothes and other items.",
    quantity: 15,
  },
  {
    name: "Disinfectant",
    description:
      "A chemical liquid used to eliminate bacteria and viruses on surfaces.",
    quantity: 10,
  },
  {
    name: "Gloves",
    description:
      "Protective hand coverings used while cleaning to avoid contact with chemicals and dirt.",
    quantity: 25,
  },
];
const protectiveItems = [
  {
    name: "Dish Soap",
    description: "A liquid soap for washing dishes.",
    quantity: 3,
    pairs: "Single",
  },
  {
    name: "Glass Cleaner",
    description: "A spray cleaner for glass surfaces.",
    quantity: 2,
    pairs: "Single",
  },
  {
    name: "All-Purpose Cleaner",
    description: "A versatile cleaner for various surfaces.",
    quantity: 4,
    pairs: "Single",
  },
  {
    name: "Laundry Detergent",
    description: "A detergent for washing clothes.",
    quantity: 5,
    pairs: "Single",
  },
  {
    name: "Bleach",
    description: "A strong cleaner and disinfectant.",
    quantity: 2,
    pairs: "Single",
  },
  {
    name: "Floor Cleaner",
    description: "A cleaner specifically for floors.",
    quantity: 3,
    pairs: "Single",
  },
  {
    name: "Toilet Bowl Cleaner",
    description: "A cleaner for the toilet bowl.",
    quantity: 2,
    pairs: "Single",
  },
  {
    name: "Furniture Polish",
    description: "A polish for wooden furniture.",
    quantity: 3,
    pairs: "Pairs",
  },
  {
    name: "Oven Cleaner",
    description: "A strong cleaner for oven interiors.",
    quantity: 1,
    pairs: "Single",
  },
  {
    name: "Carpet Cleaner",
    description: "A cleaner for removing stains from carpets.",
    quantity: 2,
    pairs: "Pairs",
  },
];

const chemicalTracker = [
  {
    name: "All-Purpose Cleaner",
    description: "A versatile cleaner for various surfaces.",
    quantity: 2,
    unit: "liters",
  },
  {
    name: "Glass Cleaner",
    description: "A solution for streak-free window cleaning.",
    quantity: 1,
    unit: "liter",
  },
  {
    name: "Disinfectant Spray",
    description: "Kills 99.9% of germs and bacteria.",
    quantity: 3,
    unit: "cans",
  },
  {
    name: "Floor Cleaner",
    description: "Specialized formula for hardwood and tile floors.",
    quantity: 5,
    unit: "liters",
  },
  {
    name: "Bleach",
    description: "Powerful stain remover and disinfectant.",
    quantity: 2,
    unit: "liters",
  },
  {
    name: "Sponges",
    description: "Absorbent sponges for scrubbing and wiping.",
    quantity: 10,
    unit: "pieces",
  },
  {
    name: "Mop",
    description: "Microfiber mop for efficient floor cleaning.",
    quantity: 2,
    unit: "pieces",
  },
  {
    name: "Broom",
    description: "Bristle broom for sweeping floors.",
    quantity: 1,
    unit: "piece",
  },
  {
    name: "Dustpan",
    description: "Dustpan for collecting dirt and debris.",
    quantity: 1,
    unit: "piece",
  },
  {
    name: "Rubber Gloves",
    description: "Protective gloves for cleaning tasks.",
    quantity: 5,
    unit: "pairs",
  },
];

const Inventory = () => {
  const { getCleaningItems, allCleaningItems,loading,getProtectiveItems,allProtectiveItems } = useInventory();
  useEffect(() => {
    getCleaningItems();
    getProtectiveItems()
  }, []);

  return (
    <div className="text-black  bg-white  h-screen w-full">
      <Suspense fallback={<Spinner />}>
        {" "}
        <InventoryHeader />
      </Suspense>

      <>
        {loading ? (
          <div class=" lg:mt-10 mt-5 shadow rounded-md px-4 lg:px-20  w-full mx-auto">
            <div className="animate-pulse flex flex-col space-x-4">
              {/* <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 animate-pulse w-full">
                <div className="rounded-sm bg-slate-300 h-60   w-auto"></div>
                <div className="rounded-sm bg-slate-300 h-60 w-auto"></div>
                <div className="rounded-sm bg-slate-300 h-60 w-auto"></div>
              </div> */}
              <div className="grid  grid-cols-3  animate-pulse w-full mt-10">
                <div className="rounded-sm bg-slate-300 h-12 w-auto"></div>
                <div className="rounded-sm bg-slate-700 h-12 w-auto"></div>
                <div className="rounded-sm bg-slate-500 h-12 w-auto"></div>
              </div>
              <div className="flex-1 space-y-6 py-1 lg:mt-10 mt-5">
                {/* <div className="h-2 bg-slate-700 rounded"></div> */}
                <div className="s">
                  <div className="flex flex-col">
                    <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                    <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                    <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                    <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                    <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                    <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  </div>
                  {/* <div className="h-2 bg-slate-700 rounded"></div> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-black flex flex-col gap-4  bg-white lg:px-10 p-5 w-full">
            <Suspense fallback={<Spinner />}>
              <InventoryTabs
                data={data}
                chemicalTracker={chemicalTracker}
                cleaningTools={allCleaningItems}
                protectiveItems={allProtectiveItems}
        
                loading={false}
           
              />
            </Suspense>
          </div>
        )}
      </>
    </div>
  );
};

export default Inventory;
