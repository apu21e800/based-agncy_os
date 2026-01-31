import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Globe, Star } from 'lucide-react';
import { RestaurantInfo as RestaurantInfoType } from '../../state/menuConfig';

interface RestaurantInfoProps {
  info: RestaurantInfoType;
}

export function RestaurantInfo({ info }: RestaurantInfoProps) {
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0">
          <img
            src={info.heroImage}
            alt={info.name}
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-white mb-4">About {info.name}</h1>
            <p className="text-xl text-orange-300 max-w-2xl">{info.tagline}</p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Story */}
            {info.story && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl bg-white p-8 shadow-lg border border-slate-200"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Story</h2>
                <p className="text-slate-700 leading-relaxed text-lg">{info.story}</p>
              </motion.div>
            )}

            {/* Cuisine Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 p-8 shadow-lg border border-orange-200"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Cuisine Specialties</h2>
              <div className="flex flex-wrap gap-3">
                {info.cuisineTypes.map((cuisine) => (
                  <span
                    key={cuisine}
                    className="inline-flex items-center rounded-full bg-white px-4 py-2 text-base font-semibold text-orange-700 border border-orange-200 shadow-sm"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Hours of Operation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-white p-8 shadow-lg border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-7 w-7 text-orange-600" />
                <h2 className="text-2xl font-bold text-slate-900">Hours of Operation</h2>
              </div>
              <div className="space-y-3">
                {daysOrder.map((day) => {
                  const isToday = day === new Date().toLocaleDateString('en-US', { weekday: 'long' });
                  return (
                    <div
                      key={day}
                      className={`flex items-center justify-between rounded-lg p-4 transition-all ${
                        isToday
                          ? 'bg-gradient-to-r from-orange-100 to-amber-100 border-2 border-orange-300'
                          : 'bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <span className={`font-semibold ${isToday ? 'text-orange-900' : 'text-slate-700'}`}>
                        {day}
                        {isToday && <span className="ml-2 text-xs font-bold text-orange-600">(Today)</span>}
                      </span>
                      <span className={`font-medium ${isToday ? 'text-orange-800' : 'text-slate-600'}`}>
                        {info.hours[day]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-xl text-white sticky top-6"
            >
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-orange-600 p-3">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-orange-300 mb-1">Address</p>
                    <p className="text-white">{info.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-orange-600 p-3">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-orange-300 mb-1">Phone</p>
                    <a
                      href={`tel:${info.phone}`}
                      className="text-white hover:text-orange-300 transition-colors"
                    >
                      {info.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-orange-600 p-3">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-orange-300 mb-1">Email</p>
                    <a
                      href={`mailto:${info.email}`}
                      className="text-white hover:text-orange-300 transition-colors break-all"
                    >
                      {info.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button className="w-full rounded-full bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105">
                  Make a Reservation
                </button>
                <button className="w-full rounded-full border-2 border-white px-6 py-3 text-base font-bold text-white transition-all hover:bg-white/10">
                  Get Directions
                </button>
              </div>
            </motion.div>

            {/* Rating Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-lg border border-orange-200"
            >
              <div className="text-center">
                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-1">4.9</p>
                <p className="text-sm text-slate-600">Based on 1,250+ reviews</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
