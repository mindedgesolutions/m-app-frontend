import { Search } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { debounce } from 'lodash';
import { useMemo } from 'react';

type AppProductSearchProps = {
  setSearchTerm: (term: string) => void;
  count: number;
};

const AppProductSearch = ({ setSearchTerm, count }: AppProductSearchProps) => {
  const debouncedSearch = useMemo(
    () => debounce((v: string) => setSearchTerm(v), 400),
    []
  );

  return (
    <div className="mb-4 grid grid-cols-1 md:grid-cols-4">
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
export default AppProductSearch;
