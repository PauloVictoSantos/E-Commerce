"use client";

import { useParams, useRouter } from "next/navigation";
import { Store } from "@prisma/client";
import { useState } from "react";
import { Check, ChevronsUpDown, StoreIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StoreListItem } from "./store-list-item";
import { useStoreModal } from "@/hooks/use-store-modal";
import { CreateNewStoreItem } from "./create-store-item";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export function StoreSwitcher({ items }: StoreSwitcherProps) {
  const params = useParams();
  const router = useRouter();
  const storeModal = useStoreModal();

  const formattdStores = items?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattdStores?.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState<{ label: string; value: string }[]>(
    []
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  const handleSearchterm = (e: any) => {
    setSearchTerm(e.target.value);
    setFiltered(
      formattdStores.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.value
            ? formattdStores.find(
                (framework) => framework.value === currentStore?.value
              )?.label
            : "Select store..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <div className="w-full px-2 py-1  flex items-center border rounded-md border-gray-100">
            <StoreIcon className="mr-2 h-4 w-4 min-w-4" />
            <input
              type="text"
              onChange={handleSearchterm}
              className="flex-1 w-full outline-none"
            />
          </div>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandGroup heading="Stores">
              {searchTerm === "" ? (
                formattdStores.map((item, i) => (
                  <StoreListItem
                    store={item}
                    key={i}
                    onSelect={onStoreSelect}
                    isChecked={currentStore?.value == item.value}
                  />
                ))
              ) : filtered.length > 0 ? (
                formattdStores.map((item, i) => (
                  <StoreListItem
                    store={item}
                    key={i}
                    onSelect={onStoreSelect}
                    isChecked={currentStore?.value == item.value}
                  />
                ))
              ) : (
                <CommandEmpty>No Store fround</CommandEmpty>
              )}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CreateNewStoreItem
              onClick={() => {setOpen(false), storeModal.onOpen()}}
              />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
