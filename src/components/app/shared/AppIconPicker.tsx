import * as FaIconsModule from 'react-icons/fa6';
import { useMemo, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { InputGroupAddon } from '@/components/ui/input-group';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import type { IconType } from 'react-icons/lib';
import { cn } from '@/lib/utils';

export type Library = 'react-icons/gi' | 'react-icons/fa';
export type SelectedIcon = { library: Library; name: string } | undefined;

interface IconPickerProps {
  value?: SelectedIcon;
  onChange: (val: SelectedIcon) => void;
  maxIconsToShow?: number;
}

type IconComponentType = IconType | React.ComponentType<any>;
type IconRecord = Record<string, IconComponentType>;

const giIcons = GiIcons as unknown as IconRecord;
const faIcons = FaIcons as unknown as IconRecord;

// main component starts
const AppIconPicker = ({
  value,
  onChange,
  maxIconsToShow = 1000,
}: IconPickerProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const iconsList = useMemo(() => {
    const giNames = Object.keys(giIcons).map((name) => ({
      library: 'react-icons/gi' as Library,
      name,
    }));
    const faNames = Object.keys(faIcons).map((name) => ({
      library: 'react-icons/fa' as Library,
      name,
    }));
    return [...giNames, ...faNames];
  }, []);

  // --------------------

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const arr = q
      ? iconsList.filter((i) => i.name.toLowerCase().includes(q))
      : iconsList;
    return arr.slice(0, maxIconsToShow);
  }, [iconsList, search, maxIconsToShow]);

  // --------------------

  const RenderIcon = ({
    library,
    name,
    size = 18,
  }: {
    library: Library;
    name: string;
    size?: number;
  }) => {
    const record = library === 'react-icons/gi' ? giIcons : faIcons;
    const Comp = (record as IconRecord)[name];
    if (!Comp) return null;
    return <Comp size={size} aria-hidden />;
  };

  return (
    <InputGroupAddon align="inline-end">
      <Popover
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (isOpen) setSearch('');
        }}
      >
        <PopoverTrigger asChild>
          <button type="button">
            {value ? (
              <RenderIcon library={value.library} name={value.name} size={16} />
            ) : (
              <FaIconsModule.FaIcons className="cursor-pointer" size={16} />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-96 max-h-[60vh] overflow-hidden"
        >
          <div className="space-y-2">
            <input
              className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-xs border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm"
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="overflow-y-auto max-h-64 pr-1">
              <div className="grid grid-cols-5 gap-2">
                {filtered.length === 0 ? (
                  <div className="col-span-8 text-sm text-muted-foreground p-4">
                    No icons found
                  </div>
                ) : (
                  filtered.map(({ library, name }) => {
                    const key = `${library}-${name}`;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          onChange({ library, name });
                          setOpen(false);
                        }}
                        className={cn(
                          'flex items-center justify-center p-2 rounded hover:bg-accent',
                          value &&
                            value.library === library &&
                            value.name === name
                            ? 'ring-2 ring-offset-1'
                            : ''
                        )}
                        title={`${library} / ${name}`}
                      >
                        <RenderIcon library={library} name={name} size={18} />
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </InputGroupAddon>
  );
};
export default AppIconPicker;
