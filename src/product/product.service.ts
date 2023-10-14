import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
	constructor(@InjectModel('Product') private readonly ProductModel: Model<ProductDocument>) {}

	async create(name: string, price: number, description: string): Promise<ProductDocument> {
		const newProduct = new this.ProductModel({
			name,
			price,
			description,
		});
		return newProduct.save();

	}

	async findAll(): Promise<ProductDocument[]> {
		return this.ProductModel.find().exec();
	}

	async find(id: string): Promise<ProductDocument> {
		return this.ProductModel.findById(id).exec();
	}

	async update(id: string, newName: string, newPrice: number, newDescription: string): Promise<ProductDocument> {
		let existingProduct = await this.find(id);
		existingProduct.name = newName ?? existingProduct.name;
		existingProduct.price = newPrice ?? existingProduct.price;
		existingProduct.description = newDescription ?? existingProduct.description;

		return existingProduct.save();
	}

	async delete(id: string): Promise<any> {
		return this.ProductModel.deleteOne({ _id: id }).exec();
	}
}
