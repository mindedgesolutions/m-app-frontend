import { Search } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { useMemo } from 'react';
import { debounce } from 'lodash';

type AppCategorySearchProps = {
  setSearchTerm: (term: string) => void;
  count: number;
};

const AppCategorySearch = ({
  setSearchTerm,
  count,
}: AppCategorySearchProps) => {
  const debouncedSearch = useMemo(
    () => debounce((v: string) => setSearchTerm(v), 400),
    []
  );

  return (
    <div className="mb-4 grid grid-cols-1 md:grid-cols-3">
      <div className="col-span-1">
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            onChange={(e) => debouncedSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">{count} results</InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
};
export default AppCategorySearch;
