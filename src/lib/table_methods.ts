export function sortField(data: doctor[], item: string) {
    let list = [...data];
    if (item === "Ascending Order") {
      return list.sort((a, b) => a?.field.localeCompare(b?.field));
    } else {
      return list.sort((a, b) => b?.field.localeCompare(a?.field));
    }
  }
  export function sortName(data: doctor[], item: string) {
    let list = [...data];
    if (item === "Ascending Order") {
      return list.sort((a, b) => a?.name.localeCompare(b?.name));
    } else {
      return list.sort((a, b) => b?.name.localeCompare(a?.name));
    }
  }
  export function sortPhone(data: doctor[], item: string) {
    let list = [...data];
    if (item === "Ascending Order") {
      return list.sort((a, b) => a?.phone.localeCompare(b?.phone));
    } else {
      return list.sort((a, b) => b?.phone.localeCompare(a?.phone));
    }
  }
  export function searchName(search: string, data: doctor[]) {
    let list: doctor[] = [];
    data.map(({ name }, index) => {
      if (name.toLowerCase().includes(search.toLowerCase())) {
        list.push(data[index]);
      }
    });
    return list;
  }
  export function removeDoctor(name: string, data: doctor[]) {
    let list = [...data];
    return list.filter((n) => n.name !== name);
  }
  export function sortByCategory(field: string, data: doctor[]) {
    let list = [...data];
    return list.filter((n) => n.field === field);
  }
  