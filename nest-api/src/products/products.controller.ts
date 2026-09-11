import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Query } from "@nestjs/common";

let items = [
  {
    id: 1,
    name: "Apple",
    price: 100000,
    category: "fruit"
  },
  {
    id: 2,
    name: "Strawberry",
    price: 500000,
    category: "fruit"
  }, {
    id: 3,
    name: "Grape",
    price: 300000,
    category: "fruit"
  },
  {
    id: 4,
    name: "Apple Juice",
    price: 50000,
    category: "juice"
  },
  {
    id: 5,
    name: "Grape Juice",
    price: 100000,
    category: "juice"
  },
]

@Controller('products')
export class ProductsController {
  @Get()
  findAll(@Query('category') category?: string) {
    const itemsFound = items.filter((item) => item.category === category)

    if (!category) {
      return items
    }

    return itemsFound;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const itemFound = items.find((item) => String(item.id) === id)

    if (!id || !itemFound) {
      throw new NotFoundException('Product not found');
    }

    return itemFound
  }

  @Post()
  create(@Body() body: { name: string; price: number; category: string }) {
    const keys = ['name', 'price', 'category'];
    if (keys.some((key) => !body[key as keyof typeof body])) {
      throw new BadRequestException("Missing infomation")
    }

    const newId = Math.max(...items.map((item) => item.id)) + 1;
    const newItem = { ...body, id: newId }

    items.push(newItem)

    return newItem;
  }
}
