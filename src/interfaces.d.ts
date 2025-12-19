interface MenuCategoryProps {
  name: string;
  link: string;
  icon: React.ElementType;
}

interface AdminMenuProps {
  title: string;
  icon: React.ElementType;
  url?: string;
  children?: AdminSubmenuProps[];
}

interface AdminSubmenuProps {
  title: string;
  url: string;
}

interface MetaProps {
  currentPage: number | null;
  lastPage: number | null;
  total: number | null;
}

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  addClass?: string;
}

interface ApiResponse<T> {
  data: T;
}

interface EditFormProps {
  editId?: number | null;
  setEditId?: React.Dispatch<React.SetStateAction<number | null>>;
  revalidating?: () => Promise<void>;
}

interface UserProps {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date | null;
  role: string;
}

interface AllCategoryProps {
  id: number;
  name: string;
  category_id?: number;
}

interface CategoryProps {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  library?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date | null;
  sub_categories: SubCategoryProps[];
}

interface SubCategoryProps {
  id: number;
  category_id: number;
  name: string;
  description?: string;
  icon?: string;
  library?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date | null;
  category_name: string;
}
