import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Thống kê',
    icon: 'browser-outline',
    link: '/AdminShop',
    home: true,
  },
  {
    title: 'Trang chủ',
    icon: 'home-outline',
    children: [
      {
        title: 'Header',
        icon: 'layers-outline',
        link: '/AdminShop/trang-chu/header',
      },
      {
        title: 'Footer',
        icon: 'layers-outline',
        link: '/AdminShop/trang-chu/footer',
      },
      {
        title: 'Bài viết',
        icon: 'book-open-outline',
        link: '/AdminShop/trang-chu/bai-viet',
      },
      {
        title: 'Slider',
        icon: 'film-outline',
        link: '/AdminShop/trang-chu/slider',
      },
      {
        title: 'Phản hồi',
        icon: 'message-square-outline',
        link: '/AdminShop/trang-chu/feedback',
      },
      {
        title: 'Bình luận',
        icon: 'message-circle-outline',
        link: '/AdminShop/trang-chu/binh-luan',
      },
      {
        title: 'Quản lý bình luận',
        icon: 'message-circle-outline',
        link: '/AdminShop/trang-chu/quan-ly-binh-luan',
      },
    ],
  },
  {
    title: 'Quản lý Shop',
    icon: 'shopping-bag-outline',
    children: [
      {
        title: 'Quản lý đơn hàng',
        icon: 'shopping-cart-outline',
        link: '/AdminShop/quan-ly-shop/quan-ly-don-hang',
      },
      {
        title: 'Sản phẩm',
        icon: 'layers-outline',
        link: '/AdminShop/quan-ly-shop/san-pham',
      },
      {
        title: 'Kho hàng',
        icon: 'cube-outline',
        link: '/AdminShop/quan-ly-shop/kho-hang',
      },
      {
        title: 'Voucher',
        icon: 'percent-outline',
        link: '/AdminShop/quan-ly-shop/voucher',
      },
    ],
  },
  {
    title: 'Danh mục chung',
    icon: 'menu-outline',
    children: [
      {
        title: 'Danh mục bài viết',
        icon: 'book-outline',
        link: '/AdminShop/danh-muc-chung/danh-muc-bai-viet',
      },
      {
        title: 'Danh mục sản phẩm',
        icon: 'shopping-cart-outline',
        link: '/AdminShop/danh-muc-chung/danh-muc-san-pham',
      },
      {
        title: 'Danh mục từ điển',
        icon: 'bookmark-outline',
        link: '/AdminShop/danh-muc-chung/danh-muc-tu-dien',
      }
    ]
  },
  {
    title: 'Quản trị hệ thống',
    icon: 'settings-outline',
    children: [
      {
        title: 'Người dùng',
        icon: 'person-add-outline',
        link: '/AdminShop/quan-tri-he-thong/nguoi-dung',
      },
      {
        title: 'Quản lý shop',
        icon: 'shopping-bag-outline',
        link: '/AdminShop/quan-tri-he-thong/quan-ly-shop',
      },
      {
        title: 'Nhóm người dùng',
        icon: 'people-outline',
        link: '/AdminShop/quan-tri-he-thong/nhom-nguoi-dung',
      },
      {
        title: 'Nhóm menu người dùng',
        icon: 'options-2-outline',
        link: '/AdminShop/quan-tri-he-thong/nhom-menu-nguoi-dung',
      },
      {
        title: 'Quản lý menu',
        icon: 'menu-outline',
        link: '/AdminShop/quan-tri-he-thong/quan-ly-menu',
      }
    ],
  }
];
