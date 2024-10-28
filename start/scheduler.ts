import scheduler from 'adonisjs-scheduler/services/main'

scheduler.command('healthcheck-report').weekly()
