import { motion } from 'framer-motion';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import { RestaurantInfo } from '../../state/menuConfig';

interface HeroProps {
  info: RestaurantInfo;
  gradient: { start: string; end: string };
}

export function Hero({ info, gradient }: HeroProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${gradient.start} 0%, ${gradient.end} 100%)` }}
    >
      <div className="absolute inset-0">
        <img
          src={info.heroImage}
          alt={info.name}
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-white"
        >
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {info.name}
          </h1>

          <p className="mt-4 text-xl text-white/90 sm:text-2xl font-light">
            {info.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {info.cuisineTypes.map((cuisine) => (
              <span
                key={cuisine}
                className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
              >
                {cuisine}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-start gap-3 rounded-lg bg-white/10 p-4 backdrop-blur-sm"
            >
              <MapPin className="h-5 w-5 text-white/80 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-white/70">Location</p>
                <p className="mt-1 text-sm text-white">{info.address}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-start gap-3 rounded-lg bg-white/10 p-4 backdrop-blur-sm"
            >
              <Clock className="h-5 w-5 text-white/80 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-white/70">Hours Today</p>
                <p className="mt-1 text-sm text-white">
                  {info.hours[new Date().toLocaleDateString('en-US', { weekday: 'long' })]}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex items-start gap-3 rounded-lg bg-white/10 p-4 backdrop-blur-sm"
            >
              <Phone className="h-5 w-5 text-white/80 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-white/70">Phone</p>
                <p className="mt-1 text-sm text-white">{info.phone}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex items-start gap-3 rounded-lg bg-white/10 p-4 backdrop-blur-sm"
            >
              <Mail className="h-5 w-5 text-white/80 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-white/70">Email</p>
                <p className="mt-1 text-sm text-white truncate">{info.email}</p>
              </div>
            </motion.div>
          </div>

          {info.story && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="mt-8 text-base text-white/80 leading-relaxed max-w-2xl"
            >
              {info.story}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
