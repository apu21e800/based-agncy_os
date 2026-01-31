import { motion } from 'framer-motion';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import { RestaurantInfo } from '../../state/menuConfig';

interface HeroProps {
  info: RestaurantInfo;
}

export function Hero({ info }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={info.heroImage}
          alt={info.name}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Restaurant Name */}
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {info.name}
          </h1>

          {/* Tagline */}
          <p className="mt-4 text-xl text-orange-300 sm:text-2xl font-light">
            {info.tagline}
          </p>

          {/* Cuisine Types */}
          <div className="mt-6 flex flex-wrap gap-2">
            {info.cuisineTypes.map((cuisine) => (
              <span
                key={cuisine}
                className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white border border-white/20"
              >
                {cuisine}
              </span>
            ))}
          </div>

          {/* Info Grid */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-start gap-3 rounded-lg bg-white/5 backdrop-blur-sm p-4 border border-white/10"
            >
              <MapPin className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-orange-300">Location</p>
                <p className="mt-1 text-sm text-white">{info.address}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-start gap-3 rounded-lg bg-white/5 backdrop-blur-sm p-4 border border-white/10"
            >
              <Clock className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-orange-300">Hours Today</p>
                <p className="mt-1 text-sm text-white">
                  {info.hours[new Date().toLocaleDateString('en-US', { weekday: 'long' })]}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex items-start gap-3 rounded-lg bg-white/5 backdrop-blur-sm p-4 border border-white/10"
            >
              <Phone className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-orange-300">Phone</p>
                <p className="mt-1 text-sm text-white">{info.phone}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex items-start gap-3 rounded-lg bg-white/5 backdrop-blur-sm p-4 border border-white/10"
            >
              <Mail className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-orange-300">Email</p>
                <p className="mt-1 text-sm text-white truncate">{info.email}</p>
              </div>
            </motion.div>
          </div>

          {/* Story */}
          {info.story && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="mt-8 text-base text-slate-300 leading-relaxed max-w-2xl"
            >
              {info.story}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
