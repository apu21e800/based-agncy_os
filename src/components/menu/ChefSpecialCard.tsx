import { motion } from 'framer-motion';
import { ChefHat, Clock } from 'lucide-react';
import { ChefSpecial } from '../../state/menuConfig';

interface ChefSpecialCardProps {
  special: ChefSpecial;
  onClick?: () => void;
}

export function ChefSpecialCard({ special, onClick }: ChefSpecialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200 shadow-xl cursor-pointer group"
    >
      {/* Banner */}
      <div className="absolute top-4 -right-12 rotate-45 bg-gradient-to-r from-amber-500 to-orange-600 px-12 py-1.5 text-xs font-bold text-white shadow-lg">
        CHEF'S SPECIAL
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="relative h-64 md:h-full overflow-hidden">
          <img
            src={special.image}
            alt={special.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Premium Badge */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg">
              <ChefHat className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-bold text-slate-900">Exclusive Experience</span>
            </div>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-4 right-4">
            <div className="rounded-full bg-white/95 backdrop-blur-sm px-6 py-3 shadow-lg">
              <span className="text-2xl font-bold text-orange-600">{special.price}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-2">
              {special.title}
            </h3>
            <p className="text-lg text-orange-600 font-semibold mb-4">
              {special.subtitle}
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              {special.description}
            </p>

            {special.availableUntil && (
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 border border-amber-200">
                <Clock className="h-4 w-4" />
                {special.availableUntil}
              </div>
            )}
          </div>

          {/* Courses List */}
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              {special.courses.length}-Course Menu
            </h4>
            <div className="space-y-2">
              {special.courses.map((course, index) => (
                <div key={course.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{course.name}</p>
                    <p className="text-xs text-slate-600">{course.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button className="mt-6 w-full rounded-full bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105">
            Reserve This Experience
          </button>
        </div>
      </div>
    </motion.article>
  );
}
