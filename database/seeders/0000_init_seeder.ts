import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await this.createDefaultUser()
  }

  async createDefaultUser() {
    await User.create({
      email: 'root@dev.fr',
      fullName: 'Root',
      password: 'rootroot',
    })
  }
}
