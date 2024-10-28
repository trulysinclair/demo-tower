import { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  async index({ inertia, auth }: HttpContext) {
    return inertia.render('admin', {
      user: auth.user,
    })
  }
}
