import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'articles'>('home');

  const articles: Article[] = [
    {
      id: 1,
      title: 'Минимализм в современном дизайне',
      excerpt: 'Исследование принципов минимализма и их применение в цифровом пространстве. Как простота формы создает глубину восприятия.',
      category: 'Дизайн',
      date: '28 октября 2024',
      readTime: '5 мин',
      featured: true
    },
    {
      id: 2,
      title: 'Будущее веб-технологий',
      excerpt: 'Анализ трендов и направлений развития веб-разработки в следующем десятилетии.',
      category: 'Технологии',
      date: '25 октября 2024',
      readTime: '7 мин'
    },
    {
      id: 3,
      title: 'Типографика как искусство',
      excerpt: 'Погружение в мир шрифтов и их роль в создании эмоционального отклика.',
      category: 'Дизайн',
      date: '22 октября 2024',
      readTime: '4 мин'
    },
    {
      id: 4,
      title: 'Философия простоты',
      excerpt: 'Размышления о том, как меньшее количество элементов создает больше смысла.',
      category: 'Философия',
      date: '18 октября 2024',
      readTime: '6 мин'
    },
    {
      id: 5,
      title: 'Цвет в минималистичном дизайне',
      excerpt: 'Как использовать цветовые акценты в пространстве белого и черного.',
      category: 'Дизайн',
      date: '15 октября 2024',
      readTime: '5 мин'
    },
    {
      id: 6,
      title: 'Пространство и баланс',
      excerpt: 'Важность негативного пространства в создании гармоничных композиций.',
      category: 'Дизайн',
      date: '10 октября 2024',
      readTime: '4 мин'
    }
  ];

  const featuredArticle = articles.find(a => a.featured);
  const regularArticles = articles.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-primary">RODSHIRE</h1>
            <nav className="flex gap-8">
              <button
                onClick={() => setActiveSection('home')}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  activeSection === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('articles')}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  activeSection === 'articles' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Статьи
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {activeSection === 'home' && featuredArticle && (
          <section className="mb-24">
            <Card className="overflow-hidden border-0 shadow-none hover:shadow-lg transition-all duration-500 cursor-pointer group">
              <div className="p-12 bg-secondary/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    {featuredArticle.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                  <span className="text-xs text-muted-foreground">{featuredArticle.date}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                  <span className="text-xs text-muted-foreground">{featuredArticle.readTime}</span>
                </div>
                <h2 className="text-5xl font-bold mb-6 text-primary group-hover:text-foreground transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all">
                  <span>Читать далее</span>
                  <Icon name="ArrowRight" size={20} />
                </div>
              </div>
            </Card>
          </section>
        )}

        <section>
          {activeSection === 'home' && (
            <h3 className="text-2xl font-bold mb-12 text-primary">Последние публикации</h3>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden border-0 shadow-none hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-foreground transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-32">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">© 2024 RODSHIRE. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Mail" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
