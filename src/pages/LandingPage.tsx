import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion, Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import featureCards from '@/__mocks__/landingPage'

export function LandingPage() {
  const navigate = useNavigate()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="container mx-auto flex items-center justify-between p-4 md:p-6"
      >

        <div className="flex items-center justify-center gap-3 mb-8">
          <img src="/assets/logo.svg" alt="logo" className="w-16 h-16" />
        </div>
        <Button onClick={() => navigate('/login')} variant="ghost" className="text-white hover:bg-zinc-800">
          Login
        </Button>
      </motion.header>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center py-20 md:py-32"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Organize suas dívidas e recupere sua <span className="text-orange-500">saúde financeira</span>.
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 max-w-2xl mx-auto text-lg text-zinc-400">
            DEBT PAY é a plataforma definitiva para você controlar, planejar e quitar suas dívidas de forma inteligente e visual.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-10">
            <Button onClick={() => navigate('/login')} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6">
              Acessar Plataforma
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Tudo que você precisa para virar o jogo</h2>
            <p className="text-zinc-400 mt-2">Ferramentas poderosas para uma gestão financeira eficiente.</p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featureCards.map((feature, index) => (
              <motion.div variants={itemVariants} key={index}>
                <Card className="bg-zinc-900 border-zinc-800 h-full hover:border-orange-500 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-500/10 p-3 rounded-lg">
                        <feature.icon className="w-6 h-6 text-orange-500" />
                      </div>
                      <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-10 md:p-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Pronto para assumir o controle?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 max-w-xl mx-auto text-zinc-400"
            >
              Junte-se a milhares de pessoas que estão transformando suas vidas financeiras. Crie sua conta gratuita agora mesmo.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <Button onClick={() => navigate('/register')} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6">
                Criar Conta Grátis
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto text-center p-6 border-t border-zinc-800">
        <p className="text-zinc-500">&copy; 2025 DEBT PAY. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
