// Styles
import styles from './AboutPage.module.css'

// Images
import image1 from '../../Images/bgImage1.jpeg'
import image2 from '../../Images/bgImage2.webp'
import image3 from '../../Images/bgImage3.jpeg'

// Icons
import { BsFacebook, BsLinkedin, BsTwitter, BsYoutube } from 'react-icons/bs'

// React
import { Link } from 'react-router-dom'

const AboutPage = () => {
  return (
    <main className={styles.aboutContainer}>
      <div className={styles.divColor}></div>
      <h1 className={styles.title}>Um pouco sobre quem <br /> somos e qual é o propósito desse site.</h1>
      <section className={styles.section}>
        <div className={styles.paragsAndImg}>
          <div className={styles.parags}>
            <p>Explorar um mundo de possibilidades, conectar-se com mentes criativas e compartilhar suas paixões agora é mais fácil do que nunca! Bem-vindo à nossa plataforma multifacetada, um espaço digital que abraça a diversidade de pensamentos, ideias e histórias. Seja você um blogueiro ávido, um entusiasta de notícias, ou alguém com uma perspectiva única para compartilhar, nossa plataforma é o terreno fértil para suas publicações.</p>
            <p>Ao se juntar a nós, você ganha acesso a um espaço dinâmico, onde a liberdade de expressão é celebrada. Queremos que você traga suas paixões à tona, seja para discutir os eventos mais recentes, compartilhar insights profundos ou simplesmente expressar seus pensamentos do dia a dia. Nosso objetivo é criar um ambiente acolhedor para todos os tipos de vozes, incentivando a diversidade e promovendo o diálogo construtivo.</p>
          </div>
          <img className={styles.image} src={image1} alt="Foto 1" />
        </div>
        <div className={styles.paragsAndImg}>
          <img className={styles.image} src={image2} alt="Foto 2" />
          <div className={styles.parags}>
            <p>A estrutura da nossa plataforma é projetada para facilitar a publicação e a descoberta de conteúdo envolvente. O processo de criação de blogs é intuitivo e flexível, permitindo que você dê asas à sua criatividade sem barreiras técnicas. Seja qual for o seu nicho ou interesse, há espaço para você aqui. Desde artigos informativos até relatos pessoais, cada contribuição é valorizada.</p>
            <p>Além de criar, a plataforma também convida você a participar de discussões estimulantes. Deixe seus comentários nas publicações de outros usuários, compartilhe suas opiniões e expanda suas perspectivas. Acreditamos que as melhores ideias surgem quando diferentes pontos de vista se encontram, e queremos ser o ponto de encontro para essa troca enriquecedora.</p>
            <p>Não se trata apenas de publicar, mas também de construir comunidades. Ao explorar a plataforma, você terá a oportunidade de descobrir outros perfis fascinantes. Siga aqueles que compartilham seus interesses, crie conexões significativas e faça parte de uma rede global de pensadores e criadores. Acreditamos no poder da comunidade para inspirar, motivar e transformar.</p>
          </div>

        </div>
        <div className={styles.paragsAndImg}>
          <div className={styles.parags}>
            <p>A nossa visão vai além de ser apenas uma plataforma de publicação. Queremos ser um ecossistema onde as ideias florescem e as vozes encontram seu eco. Com recursos de personalização de perfil, você pode destacar sua individualidade e tornar sua presença online única. Seja você um escritor experiente ou alguém que está dando os primeiros passos na escrita, há espaço para todos aqui.</p>
            <p>Acreditamos na importância de manter um ambiente seguro e respeitoso. Nossa equipe está comprometida em garantir que a plataforma seja livre de discurso de ódio e que todos os usuários se sintam bem-vindos e respeitados. Queremos que este seja um espaço onde a diversidade é celebrada e onde as diferenças são reconhecidas como uma força motriz para o crescimento e a inovação.</p>
            <p>Então, se você está pronto para explorar, compartilhar e conectar-se, junte-se a nós! Torne-se parte desta comunidade vibrante, onde as palavras têm o poder de inspirar, informar e transformar. Comece sua jornada de descoberta e construa conexões significativas enquanto contribui para a riqueza deste ecossistema digital. Estamos ansiosos para ver as histórias, ideias e perspectivas incríveis que você trará para a nossa plataforma!</p>
          </div>
          <img className={styles.image} src={image3} alt="Foto 3" />
        </div>
        <div className={styles.socials}>
          <h3>Sociais</h3>
          <div>
            <Link to='/'>
              <BsFacebook size={25} />
            </Link>
            <Link to='/'>
              <BsYoutube size={25} />
            </Link>
            <Link to='/'>
              <BsTwitter size={25} />
            </Link>
            <Link to='/'>
              <BsLinkedin size={25} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage