interface Menu {
    title: string;
    link: string;
    icon: string;
    expand: boolean;
    items?: any[];
    options: { exact: boolean };
  }

  
  const USER_MENU_ITEMS: Menu[] = [
    {
      title: "Home",
      link: "/home",
      icon: "local_florist",
      expand: false,
      options: { exact: false }
    }
  ];

  
  const ROLES = {
    USER: "user",
  };



 interface Events {
    id:number;
    firstname: string;
    lastname:string;
    address:string;
    dob: string;
    mobile:string;
    city:string;
  }

  
  export {
    Events,
    Menu,
    USER_MENU_ITEMS,
    ROLES
  };