import React, { useState, useEffect, useCallback } from 'react';
import { Search, Heart, BookOpen, Menu, X, Plus, Share2, Home, Star, ChevronRight } from 'lucide-react';

// Definir tipos TypeScript
type Hymn = {
  id: number;
  number: number;
  titlePt: string;
  titleEm: string;
  versePt: string;
  verseEm: string;
};

type ThemeType = {
  name: string;
  primary: string;
  primarySolid: string;
  primaryText: string;
  primaryBg: string;
  primaryBorder: string;
  accent: string;
  gradient: string;
};

// ============ COMPONENTE DA CAPA - ADICIONADO ============
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onComplete(), 600);
    }, 10000); // 10 segundos
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 transition-opacity duration-600 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="max-w-lg w-full bg-white rounded-xl shadow-2xl p-8 relative overflow-hidden">
        {/* Decorações */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full -mr-20 -mt-20 opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-100 rounded-full -ml-16 -mb-16 opacity-40"></div>
        
        <div className="relative z-10">
          {/* Título Principal */}
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold text-slate-900 mb-3 tracking-tight">
              Hinário
            </h1>
            <h2 className="text-xl text-slate-700 font-serif">
              Português – Lómwe
            </h2>
          </div>

          {/* Logo/Imagem Central */}
          <div className="flex justify-center my-6">
            <div className="w-48 h-32 bg-gradient-to-r from-blue-400 via-green-300 to-yellow-300 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-transparent"></div>
              <span className="text-5xl font-bold text-white drop-shadow-lg relative z-10" style={{fontFamily: 'Georgia, serif'}}>
                JESUS
              </span>
            </div>
          </div>

          {/* Desenvolvedor Principal */}
          <div className="text-center mb-6 bg-slate-50 rounded-lg p-4">
            <p className="text-xs text-slate-600 mb-2">Desenvolvido por</p>
            <p className="text-lg font-bold text-blue-900">Mateus A. Mabolacha</p>
            <p className="text-xs text-slate-600">Nampula, Moçambique</p>
          </div>

          {/* Colaboradores */}
          <div className="text-center mb-6">
            <p className="text-xs font-semibold text-slate-600 mb-2">Colaboração:</p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-700">
              <span>W. Roberto (Quelimane)</span>
              <span>•</span>
              <span>G. Cumaquela (Nampula)</span>
              <span>•</span>
              <span>E. J. António (Nampula)</span>
            </div>
          </div>

          {/* Igreja */}
          <div className="text-center border-t border-slate-200 pt-4">
            <h3 className="text-lg font-serif text-slate-800 mb-1">
              Igreja União Baptista em Moçambique
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Mihekane – Nauela Zambézia, 20 Fevereiro 1913
            </p>
            <p className="text-xs font-semibold text-blue-900">IUBM • Quelimane</p>
          </div>

          {/* Ano de Publicação */}
          <div className="text-center mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm font-bold text-slate-800">2025</p>
            <p className="text-xs text-slate-500">Versão Digital</p>
          </div>
        </div>
      </div>
    </div>
  );
};
// ============ FIM DO COMPONENTE DA CAPA ============

const HymnalApp = () => {
  // ADICIONADO: Estado para controlar a capa
  const [showSplash, setShowSplash] = useState(true);
  
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'favorites'>('list');
  const [language, setLanguage] = useState<'pt' | 'em'>('pt');
  const [showAdModal, setShowAdModal] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [currentTheme, setCurrentTheme] = useState<'iubm' | 'assembleia' | 'metodista' | 'presbiteriana' | 'adventista' | 'pentecostal' | 'universal' | 'nazareno'>('iubm');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [adCount, setAdCount] = useState(0);

  // IDs de teste do AdMob (NÃO USE IDs REAIS EM DESENVOLVIMENTO)
  const ADMOB_CONFIG = {
    INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712', // Test ID
    BANNER: 'ca-app-pub-3940256099942544/6300978111', // Test ID
    APP_ID: 'ca-app-pub-3940256099942544~3347511713' // Test ID
  };

  const churchThemes: Record<string, ThemeType> = {
    iubm: {
      name: 'IUBM - União Baptista',
      primary: 'from-indigo-600 via-indigo-700 to-purple-700',
      primarySolid: 'bg-indigo-600',
      primaryText: 'text-indigo-700',
      primaryBg: 'bg-indigo-50',
      primaryBorder: 'border-indigo-300',
      accent: 'bg-purple-600',
      gradient: 'from-indigo-50 to-purple-50'
    },
    assembleia: {
      name: 'Assembleia de Deus',
      primary: 'from-blue-600 via-blue-700 to-cyan-700',
      primarySolid: 'bg-blue-600',
      primaryText: 'text-blue-700',
      primaryBg: 'bg-blue-50',
      primaryBorder: 'border-blue-300',
      accent: 'bg-cyan-600',
      gradient: 'from-blue-50 to-cyan-50'
    },
    metodista: {
      name: 'Igreja Metodista',
      primary: 'from-red-600 via-red-700 to-orange-700',
      primarySolid: 'bg-red-600',
      primaryText: 'text-red-700',
      primaryBg: 'bg-red-50',
      primaryBorder: 'border-red-300',
      accent: 'bg-orange-600',
      gradient: 'from-red-50 to-orange-50'
    },
    presbiteriana: {
      name: 'Igreja Presbiteriana',
      primary: 'from-slate-700 via-slate-800 to-gray-900',
      primarySolid: 'bg-slate-700',
      primaryText: 'text-slate-700',
      primaryBg: 'bg-slate-50',
      primaryBorder: 'border-slate-300',
      accent: 'bg-gray-700',
      gradient: 'from-slate-50 to-gray-50'
    },
    adventista: {
      name: 'Igreja Adventista',
      primary: 'from-emerald-600 via-emerald-700 to-teal-700',
      primarySolid: 'bg-emerald-600',
      primaryText: 'text-emerald-700',
      primaryBg: 'bg-emerald-50',
      primaryBorder: 'border-emerald-300',
      accent: 'bg-teal-600',
      gradient: 'from-emerald-50 to-teal-50'
    },
    pentecostal: {
      name: 'Igreja Pentecostal',
      primary: 'from-amber-600 via-orange-600 to-red-600',
      primarySolid: 'bg-amber-600',
      primaryText: 'text-amber-700',
      primaryBg: 'bg-amber-50',
      primaryBorder: 'border-amber-300',
      accent: 'bg-orange-600',
      gradient: 'from-amber-50 to-orange-50'
    },
    universal: {
      name: 'Igreja Universal',
      primary: 'from-rose-600 via-pink-700 to-purple-700',
      primarySolid: 'bg-rose-600',
      primaryText: 'text-rose-700',
      primaryBg: 'bg-rose-50',
      primaryBorder: 'border-rose-300',
      accent: 'bg-pink-600',
      gradient: 'from-rose-50 to-purple-50'
    },
    nazareno: {
      name: 'Igreja do Nazareno',
      primary: 'from-violet-600 via-violet-700 to-purple-700',
      primarySolid: 'bg-violet-600',
      primaryText: 'text-violet-700',
      primaryBg: 'bg-violet-50',
      primaryBorder: 'border-violet-300',
      accent: 'bg-purple-600',
      gradient: 'from-violet-50 to-purple-50'
    }
  };

  const theme = churchThemes[currentTheme];

  const fontSizes = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-xl'
  };

  // Função saveData com useCallback para evitar warnings
  const saveData = useCallback(async () => {
    try {
      // Salvar no localStorage para persistência
      localStorage.setItem('favorites-data', JSON.stringify(favorites));
      localStorage.setItem('selected-theme', currentTheme);
      if (hymns.length > 0) {
        localStorage.setItem('hymns-data', JSON.stringify(hymns));
      }
    } catch (error) {
      console.log('Erro ao salvar dados:', error);
    }
  }, [hymns, favorites, currentTheme]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [saveData]);

  const loadData = async () => {
    try {
      // SEUS 22 HINOS COMPLETOS
      const defaultHymns: Hymn[] = [
  {
    id: 1,
    number: 1,
    titlePt: "Tu, cuja voz soou",
    titleEm: "Masu awinyuru",
    versePt: `Tu, cuja voz soou,
E com poder mandou: ―faça-se a luz!‖ Ouve-nos com favor, onde o teu amor
Não brilha com fulgor, faça-se a luz!

Divina luz do Céu!
No mundo já viveu nosso Jesus.
Cegos! Há claridão! Ímpios! Eis o perdão!
Em todo o coração faça-se a luz!

Mestre, Consolador!
Ânimo abrazador em nós produz!
Paz, zelo, fé, poder sempre ansiamos ter
Conforme o teu prazer, faça-se a luz!

Supremo! Sem igual!
Trino e um! Imortal! Dá-nos a luz!
Pai! Santo é teu amor! Paciente o Salvador!
Terno o Consolador! Faça-se a luz! J. G. R.`,
    verseEm: `Masu awinyuru,
Yáhiw'epiphiyo, evinyavo!
N'naveka Pwiya Nyu, mitchaka yanyu tho. Wothene'vireru; Waryeke chwé!

Nyenyu mwárúle tho,
Wópola hiyo va m'penusha tho. Ohona yawo ni awicheliwa'wo
Hihá vothene hi; Waryeke chwé!

Munepa nyenyu tho, Éparipariru, mun'rwéle hi,
Mwélihe hiyo va, epewe m'vahe hi, Wothene vathi va; Waryeke chwé!

Oraru Nyenyu tho,
M'miruku miriru, mwíkuru tho;
M'rechele wanyu'wo, mothene wéche tho, Wi wátchu anyu hi, waryeke chwé! J. G. R.`
  },
  {
    id: 2,
    number: 2,
    titlePt: "Vinde irmãos, louvar a Deus",
    titleEm: "Nimthamale 'Tithihu",
    versePt: `Vinde irmãos, louvar a Deus, Criador da Terra e Céus.

Coro: Exaltemos o Senhor! Indizível seu amor!

Gloria e honra ao grande Rei. Alta e santa é sua lei.

Obra com poder real, Com largueza divinal.

Dia e noite a sua mão, Madurece o áureo grão.

Com os dons da salvação, Alimenta o coração.

Vida eterna, exímia luz, D'Ele herdamos em Jesus.

Dá ingresso para os Céus!
Exaltai o amor de Deus! K.`,
    verseEm: `Nimthamale 'Tithihu, Yowo tosivelaru.

Coro: Murechele wawe tho Ori wohimalaru!

Nivuwihe nsina nlo, Ori M'luku átchu tho.

Apachusha m'thene'mmo, Vathi va ni m'sulu'mmo.

Omnavakulelana hi, Nitchu sene vathi nki.

Áweherya nloko nlo Nátchu óthanliwa'wo.

Nimthamale M'lukuru,
Ta m'rechele hiharu. K.`
  },
  {
    id: 3,
    number: 3,
    titlePt: "Ti louvamos, Ó Deus",
    titleEm: "Nimthamaleru M'luku",
    versePt: `Ti louvamos, Ó Deus, pelo dom de Jesus, Que por nós, pecadores, morreu na cruz.

Coro:
Aleluia! Toda a glória Ti rendemos sem fim
Aleluia! Tua graça imploramos. Amem

Ti louvamos Ó Deus, pelo espírito de luz, Que as trevas dissipa, e a Cristo conduz.

Ti louvamos Ó Senhor, Ó Cordeiro de Deus!
Foste morto, mas vives eterno nos céus.

Vem encher-nos, Ó Deus, de celeste ardor, E fazer-nos sentir tão imenso amor! J. T. H.`,
    verseEm: `Nimthamaleru M'luku m'tokwene'tho Yesu a Wirimu ánikwela'tho.

Coro:
Aleluia n'rumiheru! Aleluia Yesu!
Aleluia n'rumiheru! Munivihe'tho!

Nithamaleru M'nepa wawélówo, Yesu áveléla onélihe'tho.

Nimthamaleru Mwana ákhwilówo, Onópola hiyo wa sotcheka'tho.

Munivaheru, nerem suwela Nyu N'siveleke Nyenyu m'mirima'mmoru.
J. T. H.`
  },
  {
    id: 4,
    number: 4,
    titlePt: "Ó crentes cantai!",
    titleEm: "Óroromela nyu",
    versePt: `Ó crentes cantai! Entoai o louvor
De Quem nos amou com divino amor!
Os crimes do mundo levando na cruz, Por nossos pecados foi morto Jesus.

A divida toda o justo pagou! Subindo, da morte os laços quebrou;
E as trevas da noite tornaram-se em luz
No dia bendito do nosso Jesus.

Imagem do Céu! Oh! Dia primor!
Mercê divinal do grande senhor!
Quão doce descanso no mundo ficou,
No dia que Deus para si consagrou!

Oh! Cumpre connosco, excelso senhor, A linda promessa do Teu amor:
Que assim congregados, Tu mesmo serás
Presente, trazendo-nos bênçãos e paz.

A lei do Senhor queremos guardar, Em um culto solene a Ti dedicar;
Do mundo celeste, cantando melhor
Daremos mil graças por este favor. K.`,
    verseEm: `Óroromela nyu mwipeleni
Yowo ansivenle wopwahasha!
Ikusherya sótcheka sothene sene Iphiwa ntakhara sótcheka sahu.

Áliva mulachu wothen'owo Ákwasa onyoro wa okhwa tho. Átatush'epipi, wi ekhaleru
Nihiku nórélihiwa na Yesu.

Yopwaniherya ya Muluku Nyu!
Yamahala yorera ya Pwiya!
Nyuwo mwavaha vathi va witchuwa,
Ti nihiku nanyu nórelihiwa.

M'luku, khwaniheryani ni hiyo. Olakana wányu worerasha;
Mukhale veri vátchu 'thukumana, Munivahe m'rechele ni óréla.

Nlamulo nanyu nikhapelele, Novaheni mavekelo ahu, Vathi va wirimu niwipeleni
Nóthamalakani ni epew'anyu. K.`
  },
  {
    id: 5,
    number: 5,
    titlePt: "Ó Deus! Meu soberano Rei!",
    titleEm: "Muluku mwáweherya hi",
    versePt: `Ó Deus! Meu soberano Rei! A Ti darei louvor.
Teu alto nome exaltarei, sempre serás Senhor.

Ilimitado em rectidão, sem termo o Teu poder.
Essa grandeza divinal, quem pode descrever?

As Tuas obras todas são sinais do Teu amor
E Teus remidos cantarão: ―Clemente é o Senhor!‖

Muitos por ódio aos que crêem os querem oprimir;
Mas Deus, fiel, os guardará: não puderam cair.

Em Ti, na Terra, em Ti nos céus, todos esperarão.
Sustento próprio lhes darás, abrindo a Tua mão.

Todos que invocam o Senhor, acham que perto está;
As suas fracas petições, Jesus atenderá.

Eternamente, durará o Reino do Senhor!
Mas triste a sorte do que, aqui, rejeitam o seu amor. K.`,
    verseEm: `Muluku mwáweherya hi, mahiku'theneru, Nyu muri vawipitha hi, owáhu weneru.

Va m'nyukhu wómwen'anyu'wo, vóricha atchuru; Munnanikhapelela tho, muniweheryaru.

Ehikhanle'wo miako tho, nilapo yelaru, Nyu mwárimkhala M'luku tho, awikhaleraru.

Miyakha ya masana tho, a ntoko 'leloru, Wi ntoko oweherya tho, wóhiyu'mharu.

Mahiku vathi vahu va, a ntoko mahi tho; Ninnakushiwa hiyo va, nichiwaleya no!

Muluku mwáweherya hi, mahiku'theneru, Munivulushe vathi hi, wirimu níperu. K.`
  },
  {
    id: 6,
    number: 6,
    titlePt: "De toda a Terra e nação",
    titleEm: "Atithi a Wirimu Nyu",
    versePt: `De toda a Terra e nação
Louvor a Cristo Levantai;
Em alta voz do coração
O nome de Jesus cantai!

Misericórdia divinal, Justiça eterna e forte amor, De litoral em litoral,
Serão cantados do Senhor.

Com reverência e com fervor, O incenso de louvor louvai; Sinceros, simples, ao Senhor, Em regozijo, exaltai!

Em toda a língua começai O cântico de Redenção;
Em toda Língua proclamai
Que Reino d'Ele os povos são. J. H. N.`,
    verseEm: `Atithi a Wirimu Nyu, Mwáhanópola hiyo 'tho; Wi mwan'sivela hihá Nyu Ninnathamala Nyuwo'tho

Apwiya Yesu Kristu Nyu, Mwáhayariwa vathi va;
Wi munikhwele hiyoru, Ninnathamala Nyuwo'tho

Munepa Nyu Wawélaru, Ti munéliha m'rima 'tho; Mwániweherya phamaru, Ninnathamala Nyuwo'tho

Atithi, Mwana, M'nepa'tho, Muri Muluku Mmoharu, Ótcheka hi n'naveka 'tho Sótcheka sahu m'leveru. J. H. N.`
  },
  {
    id: 7,
    number: 7,
    titlePt: "Folhos do celeste Rei",
    titleEm: "Hihano vava'tho",
    versePt: `Folhos do celeste Rei, sempre a Cristo bendizei; Vosso salvador louvai, suas obras exaltai.
Por caminhos viajais, já trilhados pelos mais, Santa via, que conduz, lá para onde reina a luz.

Ide, pois, não demoreis; apressai-vos, sim, deveis; O que vos espera ali, não conhece igual aqui.
Pois espera-vos Jesus, esse que, horrenda cruz, Vossa sorte a si chamou, vossa punição tomou.

Tendes Pai ali também, Pai que muito amor vos tem;
Seus filhos Ele traz, cheio de alegria e paz.
Eis, com estendidas mãos, coros santos dos irmãos, Parabéns vos querem dar, nesse alegre e doce lar.
R. H.`,
    verseEm: `Hihano vava'tho, niperu ntchipo nahu; Nihakalale 'tho, mahala nimvaheru;
Mahiku'thene'to onnaweherya hi, Onnanivaha'tho saphama saweru.

Atithi M'luku'la, takhale véri vahu;
M'rechele wawe'tho, okhale m'rima mwahu; Anohólesharu, m'pironi mwawe'mmo,
Anivulushe'tho, nikhale m'sulu'mmo.

Nimthamalekeru Atithi M'luku Yowo, Ni Yesu Pwiyahu, ni M'nepa Wawéla'tho; Muluku mmoharu, mahiku'then'awo;
Nimchichimiheru othene M'luku'la. R. H.`
  },
  {
    id: 8,
    number: 8,
    titlePt: "Rei da Glória, Ti adoramos",
    titleEm: "Chichimiha m'rima'ka we",
    versePt: `Rei da Glória, Ti adoramos, Cristo! Soberano! Deus! Ante Ti já nos prostramos, glorioso aí nos céus. Tributamos-Ti louvor, admirável Salvador!

Rei de toda Terra ungido, seu herdeiro e seu Senhor; Pelos homens repelidos, desprezado o Teu amor! Homenagem nós aqui, Ti prestamos. Cristo a Ti.

Tu "a Vida" entregue a morte! Justo entregue a maldição! Tu, do Pai, primeiro objecto, dado à cruz em oblação!
Alvo e centro, Tu, de amor, és p'ra nós, Jesus, Salvador.

Régias glórias Te pertencem; régias honras Tu terás; Do rebelde mundo o centro brevemente empunharás. Alvo agora, alvo então, de louvor e adoração! R. H.`,
    verseEm: `Chichimiha m'rima'ka we Mwene a Wirimu'wo; Yowo tákóponle miyo, akivahasa wene chwé. N'chichimihe! N'chichimihe!
M'luku a mahal'owo!

N'chichimihe! M'luku ahu, támahala Yoworu; M'luku Yola hanahiya, onivaha itchu tho. N'chichimihe! N'chichimihe!
M'luku a mahal'owo!

Ntoko 'Tithi M'luku Yola, onnaniweherya hi, Onnanikhapelelaru va mahiku' thene tho. N'chichimihe! N'chichimihe!
M'luku a mahal'owo!

Atchu nyu, maloko-thene, nave a wiriméwawo N'chichimihe M'luku ahu, Yowo támahalaru. Atchu nyenyu, atchu nyenyu,
N'chichimihe! M'luku'wo! R. H.`
  },
  {
    id: 9,
    number: 9,
    titlePt: "Deus é o nosso auxilio",
    titleEm: "Hosana tho! Hosana!",
    versePt: `Deus é o nosso auxilio, e grande Amparador, Refugio nas tristezas, potente Salvador.
Nós nunca teremos, embora, com horror
A Terra comovida se esconda do Senhor

Os mesmos firmes montes, podem estremecer, O mar e as suas águas perante Ti tremer,
Mas Tua santa Igreja, cidade do Senhor, De paz perfeita goza, está livre de temor.

Jesus no meio dela, socorro lhe dará, E graça como um rio, sempre a alegrará.
Humilhem-se os soberbos diante deste Rei; Nações, as mais potentes, curvem-se à sua lei

Os povos, em silêncio, escutem sua voz; Profunda reverencia, Ele requer de nós,
Oh! Vinde e vede as obras, do nosso protector; Jeová está connosco, o forte vencedor! K.`,
    verseEm: `Hosana tho! Hosana! Yáhipa ana'wo, Va empa ya Muluku, yálipihasharu.
Yámuthamala Yesu, ar'elihal'owo, Yámwípelasha tchiri, móréra mweneru.

O Mwako wa Ziono, va m'loko wátchuru Yáchikinya miwaryu, matchipo yíparu; Angelo tho a Muluku, yáhakhulela tho.
Hosana núthamala wa Muluku m'sulu'mmo.

Makuku ó Ziono yámisa vathi va;
Ni miako yó Salemu, n'namalwe aya tho; Ni Pwiya átchu Yowo, ahécha pamaru Hanyemunleru atchu, yámtcharatchara'wo.

Hosana m'sulusulu; Nipele ntchipo nlo! Wa Kristo Mwene yowo, túri Mvulusharu. Nimthamaleke Yowo, ni m'rimarimaru; Nakhaleru Wirimu, ori okumiru. K.`
  },
  {
    id: 10,
    number: 10,
    titlePt: "Na forte aflição",
    titleEm: "Thamala Yesu",
    versePt: `Na forte aflição, perigos e dor, Na vil traição, no negro terror, Com toda a certeza vitória verá;
É eterno a promessa, "Meu Deus proverá".

Aos pássaros Deus a abundância dá, Jeová aos seus nada negará;
Por Ele foi dito "Jamais faltará
Teu pão". Está escrito: "Meu Deus proverá".

A nossa Virtude, só, há-de falhar; Jesus é que ajuda a vitória a ganhar Na sua fortaleza nos esconderá!
Com rica largueza meu Deus proverá!

Na honra final, a morte a chegar, A voz divinal nos há-de alegrar; No vão tumular meu Jesus estará
E hei-de cantar: "Meu Deus proverá!" J. H. N.`,
    verseEm: `Thamala Yesu, Apwiya ahu Ori Wirimu mun chichimiho; Nrapala nólipa ni votchawela Wa atchu othene Yowo Muluku.

Lochani ni hikuru, ni íkharari, Sa Mwene ahu, Apwiya ahu; Vowopa etcheku nipul'etari; Vathi tho va meku onnakhala vo.

Hanino hiyo 'locha sorera,
Sa Nyuwo M'luku ophuwa atchu; Sophiya nítcheku, nípula, nsuwa, Somora vothene va atchu anyu.

A'kuru opwaha ti Apwiyahu Angelo annipa omthamala; Nave tho annanyu ni othene hi,
Niperu ntchipo nla vomtchara Pwiya. J. H. N.`
  },
  {
    id: 11,
    number: 11,
    titlePt: "Senhor! Digno és de receber",
    titleEm: "Pwiya mwanene sothene",
    versePt: `Senhor! Digno és de receber
A glória, a honra e o poder, Porque criaste todo o ser,
Oh, nosso Deus!
Formaste a Terra, os céus, e o mar, E deste ao mundo a luz e o ar; Mandaste o sol e a lua brilhar,
Oh, nosso Deus!

Tomaste o barro em Tuas mão, E d'ele fizeste um coração
Para ti amar com perfeição Oh, nosso Deus!

Ai! Ai! Tornou-se pecador; Pois cedo veio o tentador Destruir a imagem do Senhor, Oh, nosso Deus!

Mas graças graças a Jesus! Por nós por nós baixado à cruz, A nova imagem em nós produz, Oh, nosso Deus! J. G. R.`,
    verseEm: `Pwiya mwanene sothene Nimvahe nchichimiho tho, Osivela noniheni tho Mwavaharu.

Nsuwa ni'pula yothene Nnikanyo nlo monivaha tho Mulala orwel'owannyu tho Mwavaharu.

Mwavaha Mwana anyu wi Movulusha elapo ela,
Ai, samahala sothene Mwavaharu.

Nikokiherye sheni-wo? Soyelelasha sahu tho, Nókumi tho, n'rihahuno ola, Mwavaharu.

Pwiya sothene sahu tho Wa Nyuwo nikokiherye Nivelele sanyu iha tho Mwavaharu. J. G. R.`
  },
  {
    id: 12,
    number: 12,
    titlePt: "Senhor de todos é Jesus",
    titleEm: "Pwiya a hiva ti Yesu",
    versePt: `Senhor de todos é Jesus, E digno de louvor;
Vós, anjos de celeste luz, Dai glória com fervor!
Senhor de todos é Jesus, Oh! Vinde vós, nações, Louvar a quem por nós na cruz Morreu em aflições.
Prostrai-vos todos a seus pés, Em vera adoração;
Saudai-o sempre o vosso Rei, O Autor da Salvação!
E vós que tendes já perdão, Oh! Vinde-O coroar
Senhor supremo, Deus, enfim, Dos céus, da terra e mar. T. H.`,
    verseEm: `Pwiya a hiva ti Yesu, Nimuthamale hi.
Nave angelo nyu m'sulu'mo M'munchichimiheru.
Pwiya a hiva ti Yesu, Rwani maloko nyu; Nimthamale tho Yoworu Ákhwenle hiyo va.
M'mukokhorele nyenyu va. Omthamala tchiri
Mmulocheleke tho Mwen'anyu Mwanen'okumi tho.
Óvulushiwa nyenyu va Munvahe korowa
Pwiya mwene tho, ni M'luku Mwanene sothene. T. H.`
  },
  {
    id: 13,
    number: 13,
    titlePt: "Jesus! Quão infinito",
    titleEm: "Alecho mwátchu nyenyu",
    versePt: `Jesus! Quão infinito
É Teu divino amor! Além do nosso alcance Profundo é seu valor!
Os céus por nós deixaste, Vieste aqui morrer;
Nos livrarás, remidos, Contigo lá a viver.
Por isso livremente Vivemos para Ti;
A Ti obedecermos Na vida breve, aqui.

Embora desprezados, Em aflições ou dor,
É suave e bem servir-Ti, Bendito Salvador!`,
    verseEm: `Alecho mwátchu nyenyu, awecha m'kwaha tho Ni Yesu m'tchananaru, onóholáni tho.
Óhakalala nyenyu, mwaphara m'theko'wo; Etala m'voliwaru, antoko Yesu'wo.

Áthomeyiwa Yesu, ntakhara nyenyu tho; Oríye Mwene ahu, ti nthowa nahu nlo. M'muroromrle Yowo, áhasivela nyu;
M'mutakiherye Yowo, m'mechelo mwanyuru.

Sóhósha inahóla, Wirimu waweru; Tikuru sóvulusha sómewaleyasha nyu. Sóthananiha iha, sawéha sene tho, Onaviha vo nyenya, ni okhwa wawe tho.

Nyu mwátchu awe tchiri, óphwanelelaru; Munarwa-muwela nki, muyáka m'suluru. Alecho mwátchu nyenyu, mwíleva vathi va; Muyaka wirimuru, yópharya m'kusha tho.`
  },
  {
    id: 14,
    number: 14,
    titlePt: "Redentor omnipotente",
    titleEm: "Nkawehani atchu nyenyu",
    versePt: `Redentor omnipotente, Poderoso salvador, Advogado omnisciente
É Jesus, meu bom Senhor.
CORO:
Oh! Amante da minha alma, Tu és tudo para mim!
Tudo quanto eu careço, Acho, Jesus, só em Ti.
Um abrigo sempre perto Para todo o pecador;
Um refúgio sempre aberto É Jesus, meu Salvador.
Água viva, pão da vida! Doce sombra no calor
Que ao descanso nos convida, É Jesus, meu Salvador.
Sol que brilha entre as trevas, Com tão suave e meiga luz, Noite eterna dissipando
É meu Salvador Jesus. H. M. W.`,
    verseEm: `Nkawehani atchu nyenyu, Yesu Pwiya ahu'tho.
Ori m'pwaha mwikochoni Nimthamale hiyo va.
CORO:
Nimvuwihe pwiya yola, Túriru Mwana a M'luku. Onnarwa ni mahala'we Nimthamale Yoworu.

Aníriye arwe Yowo, Ni omwene wawe'tho; Onakusha atchu awe,
Yakhaleno m'sulu'mmo.
Atchu yawo yámuroha, Pwiya ahu Mwen'owo; Emónaka ananlasha Múnanara wayaru.
Hiyo núpuwelekeru, Pwiya ahu Yesu'la Nisóveke mahikwéne
Nuhichekatchekaru. H. M.W.`
  },
  {
    id: 15,
    number: 15,
    titlePt: "Diz Jesus, o Salvador",
    titleEm: "Ennaréra emparu",
    versePt: `Diz Jesus, o Salvador:
"Vinde a mim descansai; Vinde mesmo como sois; Paz eterna procurai".
Crendo nessa voz de amor, A Jesus eu me cheguei; Confiando no Senhor,
Paz, perdão e gozo achei.
Diz Jesus, o Salvador:
"Quereis luz, consolação? Vinde procurar em mim, Que vos trago redenção"! Oh! Convite se igual!
Prestem todos atenção; Infeliz, perdido eu fui; Nele achei a salvação.
Diz Jesus, Salvador:
"Quem tem sede venha a mim; Água viva eu lhe darei,
Que o fará feliz sem fim". Sequioso, fui, provei Dessa fonte de dulçor;
E minha alma revivei; Vivo agora no Senhor.`,
    verseEm: `Ennaréra emparu, ya Wirimu wanyu tho; Ennaréra vathi va, Vátchu onanara hi; M'rima waka yola tho, onnatchuna Nyuworu,
Va mithoni vanyu va, Mwene, M'luku átchu hi.
Ipalame siparu sinnavava m'sulu'mmo Sinnatheyatheyaru, munnathokororya tho: Yável'epomp'eyo tho, wóna vawítchuwa vo, Nyenya yákókela, tho, o mwacheya wuleru.
Atchu ethamale Nyu, vathi vónanara va; Mwávaheke sólyaru, inarwela m'sulu'mmo. Yeche tho mwikururu, ephiyeno m'sulu'mmo. Ethyamale Nyuworu, Mwálipihe Pwiya Nyu.
Yamahala m'vahe mi, mukihóle vathi va, Nikharari sanyu tho, kikhaleke n'Nyuworu; Nsuwa ni yósherya tho, m'kipwahihe miyo va; Kikhomále m'm'rima mu, kiwónéni m'sulu'mmo.`
  },
  {
    id: 16,
    number: 16,
    titlePt: "Deus está no templo!",
    titleEm: "M'luku ori mumu",
    versePt: `Deus está no templo! Pai omnipotente! A seus pés nos humilhemos.
Ao santíssimo adoremos. Por favor, com amor.
'Spiritualmente, Deus está no templo!
Cristo está no templo! Sumo beneficio. Recebemos do seu sangue.
Ele, o bom Cordeiro, foi o sacrifício Que o pecado todo extingue; Escolheu, e sofreu,
O cabal suplicio, Cristo está no templo!
Vem ocupa o templo, espírito divino, Nossos corações habita.
Ó paciente Mestre! Dá-nos o Teu auxílio Aclarando a lei bendita.
Com prazer, e poder
(Oh! Graça infinita!) Ele está no templo! J. G. R.`,
    verseEm: `M'luku ori mumu, nimukokhorele, Wova hiyo nimwerele!
Ori 'mpa mwa M'luku, othene hi nri chú! Mu nchichimiho nawe nlo.
M'luku ahu, ti yowo, Onnanivulusha, nimchichimiheke!
M'nene maréliho, m'reherye mirimahu, Mnroromelani Pwiya.
Wirimu angelo annothamalani, Hiyo tho ninnalapiha.
M'loko tho, wereno,
Okhwela wanyu tho, wothene vathi va.
Yesu Apwiyaka m'khale m'm'rima mwaka Ti muri empa yawinyu.
Wamal'okumi ola, kakhale owannyu, Muryanyuwo ni angelo.
M'rimaka, olipe,
Ophiyerya miyo kiwonakani Nyu. J. G. R.`
  },
  {
    id: 17,
    number: 17,
    titlePt: "Igreja do Senhor!",
    titleEm: "Muloko wa Pwiya",
    versePt: `Igreja do Senhor! Proclama com fervor:
"Quem salva é só Jesus‖!
A todo o pecador declara com amor:
"Quem salva é só Jesus‖!

Não há outro poder que possa o mal vencer, Quem salva é só Jesus!
E vão sperar viver com Deus, sem renascer, Quem salva é só Jesus!

A lei não dá perdão, dá morte e maldiçao Quem salva é só Jesus!
Em Cristo os bens estão da plena redenção Quem salva é só Jesus!

A pérola dos céus é Cristo, o dom de Deus; Quem salva é só Jesus!
Ele, só, converte os réus, e fá-los filhos seus, Quem salva é só Jesus!

Igreja do Senhor exclama com fervor:
"Quem salva é só Jesus‖!
Por tão extremo amor que tem ao pecador Louvemos a Jesus! J. G. R.`,
    verseEm: `Muloko wa Pwiya, okhuwele mwa mvai:
"Yesu ti Mvulusha‖!
Alipa-otcheka, m'lokohe núkhwela
"Yesu ti Mvulusha‖!

Havovo mukina, onavih'otcheka. Yesu ti Mvulusha!
Atchu hamviluwa, mwahitcharuwaru, Yesu ti Mvulusha!

Nlamuloru pothe, hanovulusha we, Yesu ti Mvulusha!
Omuroromele, ni m'rima wothene, Yesu ti Mvulusha!

Yophárya ya M'luku, ti Yesu Kristu'wo, Yesu ti Mvulusha!
Wacharush'otcheka, ekhale anethi,
"Yesu ti Mvulusha‖!

Muloko wa Pwiya, okhuwele mwa mvai:
"Yesu ti Mvulusha‖!
Onnasivela nki, atchu ótcheka 'wo Nimthamale Yesu! J. G. R.`
  },
  {
    id: 18,
    number: 18,
    titlePt: "Não se turbe o coração",
    titleEm: "Apwiya Yesu váriru",
    versePt: `"Não se turbe o coração, Descansai", disse Jesus.
"Eu vou vos preparar lugar Ali nos céus‖.

"Eu não vos deixarei órfãos, Mas cedo voltarei.
E onde Eu habitarei Também 'stareis‖.

"E rogarei ao Pai que Ele Vos mande Outro igual, Amigo bom, e guia fiel
Consolador‖.

Espirito do trino Deus, Outorga de Jesus,
Oh, enche os nossos corações
Co' amor e luz! J. C. P.`,
    verseEm: `Apwiya Yesu váriru, Arikimulanya;
Arummwa'wo yahovaru M'mmurima'mmo.

―Han'nasiwela nári hi Ephiro yanyu tho‖
Ákhula Yesu "Miyo ká Ephiro tho‖.

Ávaha yawo M'nep'owo' Wákhaviheryeru; Wáhusiheke masu tho
A M'lukuru.

Nimchichimihe 'Tithiru, Ni Yesu Pwiy'owo,
Ni M'nep'owo, ti M'lukuru
M'moharu tho. J. C. P.`
  },
  {
    id: 19,
    number: 19,
    titlePt: "Pastor é o Salvador Jesus",
    titleEm: "Yehova ti Mukúkhuláka",
    versePt: `Pastor é o Salvador Jesus;
Nada me poderá faltar, a salvo me conduz.

Ao pasto verde e bom, me faz encaminhar; À beira d'água pura então, me deixa descansar.

Ele o meu coração converte, com amor Me guia pela rectidão, o sábio condutor.

E, quando alfim chegar o tranzito final,
Sem medo espero caminhar, com passo triunfal.

Porque comigo está Jesus, o Salvador; E sempre me consolará, o braço do senhor.

A bondade e o amor sempre mi seguirão; E na presença do Senhor terei habitação. K.`,
    verseEm: `Yehova ti Mukúkhuláka, nkithowiwaru. Onnakivakulela, akikhapelelaru.

M'mihiche ya m'rechele onnakiwuryiha'tho Manani aka onnéchiha m'phiro yawe'tho.

M'makhwala ókothóla onnakikeriha'mmo; Ntakhara nsina nawe onakiweherya'mmo.

Sa okhwa ni sépiphi nkirwa-kova náriru; Onnakihóla miyo akishérya m'theneru.

Va mitho vámwicháni ohátala solya mi, Va muru ókóchiha'tho makurwa ala mi.

Epewe níkhararisawe inatchara mi,
Wi kilekele mu'mpa ya Muluku aka mi. K.`
  },
  {
    id: 20,
    number: 20,
    titlePt: "Jesus! Pastor amado!",
    titleEm: "Yesu ti M'kukhula",
    versePt: `Jesus! Pastor amado! Juntos eis-nos aqui! Concede que sejamos um corpo só em Ti. Contendas e malícia que longe de nós vão; Nenhum desgosto impeça a nossa santa união.

Uma só família somos, família de Jesus; Uma só morada temos, numa celeste luz. A mesma fé nos une, num só divino amor; E com o mesmo gozo, servimos ao Senhor.

Num só caminho estreito, Deus mesmo nos conduz; Não temos esperança senão num só, Jesus. Sua preciosa morte, a todos vida traz;
E pelo mesmo sangue, nos vem a mesma paz.

Pois sendo resgatados por um só Salvador, Devemos ser unidos pelo mais forte amor; Olhar com simpatia os erros dum irmão;
E todos ajudá-lo com branda compaixão.

Se Tua Igreja andar em santa uniao Entao será bendito o nome de "Cristo".
Assim, o que pediste em nós se cumprirá
E todo o mundo inteiro a Ti conhecerá! K.`,
    verseEm: `Yesu ti M'kukhula, óweherya hi, Anamwani awe tanalipa nki; Nimtchareke Yowo, anihóle hi, Mwipiphini mummo avihe'mo hi.

Yesu ti M'kukhula, nimwíwekeru, An'theyihe hiyo, nún'reliha tho; An'samele hiyo, nátchekakaru An'lipihe tchiri, niri awe tho.

Yesu ti M'kukhula, ánikhwela hi, Anélihe hiyo, n'nikhami nloru. Vano anéyerya eneneryo hi,
Anivahe hiyo M'nepa wawe tho.

Yesu ti M'kukhula, onnashérya hi, Nári néhiwaka, hanóvakaru;
Nári nakhwa hiyo, onivíha hi, Nimthamale Yowo túpwahileru. K.`
  },
  {
    id: 21,
    number: 21,
    titlePt: "Ao meditar, Jesus Senhor",
    titleEm: "Kupuwelaka miyo tho",
    versePt: `Ao meditar, Jesus Senhor, Na Tua amarga cruz por mim, Com gratidão e com louvor
Celebro a Quem me amou assim.

Mas como, o Salvador, contar O amor que foi a cruz por mim? Não poderá ninguém sondar
A dor de Quem sofreu assim.

Pecado meu Ti fez sofrer De Deus o desamparo ali:
Mas mesmo pelo Teu morrer Pudeste vida dar-me em Ti.

Té que contigo vá gozar O fruto dessa cruz, Senhor,
Que aqui Tu possas sempre achar Em mim, agrado o vero amor. J. I. F.`,
    verseEm: `Kupuwelaka miyo tho, Sóthomeyiwa Pwiy'owo, Kinnanyemula itchuru. Sókivuwiha vathi va.
Kihíthamale yomiru, Kimuthamale Kristu'wo; Ákópolaru miyo va.
N'nikhami nawe nenenlo.

Nkónani yamvoreyaru,
Yám'homa m'mata, m,manani; Akisivela miyoru
Áhoshiwsha wenetho.

Nkinono etchu nári phwe! Yón vaha Pwiyahu'woru;
Kimvaheru murim'ola, Akhale óweherya mi. J. I. F.`
  },
  {
    id: 22,
    number: 22,
    titlePt: "Assim como estou",
    titleEm: "Ohiyu yole khalai va",
    versePt: `Assim como estou, sem ter que dizer, Senão que por mim vieste a morrer,
E me convidaste a Ti recorrer, Bendito Jesus, me chego a Ti!

Assim como estou, e sem demorar, Minha alma do mal querendo limpar, A Ti, que de tudo me podes lavar, Bendito Jesus, me chego a Ti!

Assim como estou, em grande aflição Tão digno da morte e da perdição, Rogando-Te a vida, com paz e perdição, Bendito Jesus, me chego a Ti!

Assim como estou, o celeste favor Me vence; com grato e leal amor Me voto a servir-Ti, divino Senhor;
Bendito Jesus, me chego a Ti! K.`,
    verseEm: `Ohiyu yole khalai va Áveléliwa Yesuru;
Ohiyu yole mmachani, mmo Akush'epau Yolaru.

Athamalela M'lukuru Mwanene 'lapo ela tho, Ahinn'epau yeleru Alocha wa'miravo tho:

" Ti mwíliwómeyiw'ola Wa miyo m'kushe mulyeru; Mwéreru nyu othene va Yókupusherya Miyoru".

Akhusha tho m'matani'mmo Ekahi mwári vinyoru,
Athamalela M'luku tho Alocha masu yalaru.

"Ekahi ya nikhami'la Ennarapiha m'rimaru; Ti malakano hiha va Orwéla wa Muluku.

"Munónaru mwíkahíla Wátána wósivelaru; Mulaleyerye nyuwo va
Yókupusherya Miyoru". K.`
  }
];

      
      console.log('Carregando', defaultHymns.length, 'hinos');
      
      setHymns(defaultHymns);
      
      try {
        const savedTheme = localStorage.getItem('selected-theme');
        const savedFavorites = localStorage.getItem('favorites-data');
        
        if (savedTheme) {
          setCurrentTheme(savedTheme as any);
        }
        
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
        
        localStorage.setItem('hymns-data', JSON.stringify(defaultHymns));
      } catch (error) {
        console.log('Erro ao carregar do storage:', error);
      }
      
    } catch (error) {
      console.log('Erro ao carregar dados:', error);
    }
  };

  const filteredHymns = hymns.filter(hymn => {
    const searchLower = searchTerm.toLowerCase();
    return hymn.number.toString().includes(searchLower) ||
      hymn.titlePt.toLowerCase().includes(searchLower) ||
      hymn.titleEm.toLowerCase().includes(searchLower);
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const showAd = () => {
    setShowAdModal(true);
    setAdCount(prev => prev + 1);
    setTimeout(() => setShowAdModal(false), 3000);
  };

  // Componente AdBanner
  const AdBanner = () => {
    if (!showBanner) return null;
    
    return (
      <div className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-white p-2.5 shadow-md">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-xl">📢</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium opacity-90">Espaço Publicitário</p>
              <p className="text-[10px] opacity-60">AdMob Banner</p>
            </div>
          </div>
          <button 
            onClick={() => setShowBanner(false)}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Componente SupportModal
  const SupportModal = () => {
    if (!showSupportModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSupportModal(false)}>
        <div className="bg-white rounded-3xl max-w-md w-full max-h-[85vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">💚 Apoie o Hinário</h2>
              <button 
                onClick={() => setShowSupportModal(false)}
                className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm opacity-90">Sua contribuição ajuda a melhorar o app</p>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 mb-5 border-2 border-green-200">
              <h3 className="font-bold text-green-900 mb-3 text-lg flex items-center gap-2">
                <span className="text-2xl">🙏</span>
                Apoio Voluntário
              </h3>
              <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                Este app é usado na igreja para louvar e adorar. Sua doação voluntária ajudará a:
              </p>
              <ul className="space-y-2 text-sm text-slate-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>Adicionar mais hinos ao hinário</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>Melhorar funcionalidades do app</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>Publicar oficialmente na Play Store</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>Manter o app gratuito para todos</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-center mb-4">Faça sua Contribuição via:</h3>
              
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 hover:border-green-500 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 mb-1">M-Pesa</p>
                    <p className="text-sm text-slate-600 mb-2">Envie para:</p>
                    <div className="flex items-center gap-2 mb-2">
                      <code className="bg-slate-100 px-3 py-1.5 rounded-lg font-mono text-sm font-bold text-slate-800">
                        84 880 525
                      </code>
                      <button 
                        onClick={() => {
                          navigator.clipboard?.writeText('848805525');
                          alert('Número copiado: 848805525');
                        }}
                        className="text-green-600 hover:text-green-700 text-xs font-semibold"
                      >
                        Copiar
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-slate-100 px-3 py-1.5 rounded-lg font-mono text-sm font-bold text-slate-800">
                        86 137 1914
                      </code>
                      <button 
                        onClick={() => {
                          navigator.clipboard?.writeText('861371914');
                          alert('Número copiado: 861371914');
                        }}
                        className="text-green-600 hover:text-green-700 text-xs font-semibold"
                      >
                        Copiar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-xs text-amber-900 text-center">
                <strong>📱 Em breve na Play Store!</strong><br/>
                Seu apoio nos ajudará a publicar oficialmente o app
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500">
                Qualquer valor é bem-vindo e muito apreciado! 🙏
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

// Componente ThemeSelector
  const ThemeSelector = () => {
    if (!showThemeSelector) return null;
    
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowThemeSelector(false)}>
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className={`bg-gradient-to-br ${theme.primary} text-white p-6`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">Escolher Tema da Igreja</h2>
              <button 
                onClick={() => setShowThemeSelector(false)}
                className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm opacity-90">Personalize o app com as cores da sua igreja</p>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(churchThemes).map(([key, themeData]) => (
                <div
                  key={key}
                  onClick={() => {
                    setCurrentTheme(key as any);
                    setShowThemeSelector(false);
                  }}
                  className={`cursor-pointer rounded-2xl border-2 transition-all hover:scale-105 overflow-hidden ${
                    currentTheme === key ? 'border-green-500 ring-4 ring-green-200' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`bg-gradient-to-br ${themeData.primary} h-24 flex items-center justify-center`}>
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-slate-800 mb-1">{themeData.name}</h3>
                    <div className="flex gap-1 mt-2">
                      <div className={`w-8 h-8 ${themeData.primarySolid} rounded-lg`}></div>
                      <div className={`w-8 h-8 ${themeData.accent} rounded-lg`}></div>
                      <div className={`w-8 h-8 ${themeData.primaryBg} border border-slate-200 rounded-lg`}></div>
                    </div>
                    {currentTheme === key && (
                      <div className="mt-3 bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
                        ✓ Tema Ativo
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Componente HymnList
  const HymnList = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white">
      <div className={`bg-gradient-to-br ${theme.primary} text-white shadow-xl`}>
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Hinário {theme.name.split(' - ')[0]}</h1>
                <p className="text-xs opacity-90 font-medium">{theme.name.split(' - ')[1] || 'Moçambique'}</p>
              </div>
            </div>
            <button 
              onClick={() => setShowMenu(true)} 
              className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all backdrop-blur-sm"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="text"
              placeholder="Procurar por número, título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-slate-800 bg-white shadow-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>

        <div className="px-6 pb-4 flex gap-3">
          <button
            onClick={() => setLanguage('pt')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              language === 'pt' 
                ? `bg-white ${theme.primaryText} shadow-lg` 
                : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            Português
          </button>
          <button
            onClick={() => setLanguage('em')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              language === 'em' 
                ? `bg-white ${theme.primaryText} shadow-lg` 
                : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            Elomue
          </button>
        </div>
      </div>

      <AdBanner />

      <div className={`px-4 py-3 bg-gradient-to-r ${theme.gradient} border-b border-slate-200`}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-slate-600">
              <span className={`font-bold ${theme.primaryText}`}>{filteredHymns.length}</span> hinos
            </span>
            <span className="text-slate-600">
              <Heart className="w-4 h-4 inline fill-red-500 text-red-500" /> 
              <span className="font-bold text-red-600 ml-1">{favorites.length}</span> favoritos
            </span>
          </div>
          <button
            onClick={() => setCurrentView('favorites')}
            className={`${theme.primaryText} font-semibold hover:opacity-80 flex items-center gap-1`}
          >
            Ver <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {filteredHymns.map((hymn, index) => (
          <div
            key={hymn.id}
            className={`bg-white rounded-2xl shadow-sm border border-slate-200 mb-3 p-4 cursor-pointer hover:shadow-lg transition-all active:scale-[0.98]`}
            onClick={() => {
              setSelectedHymn(hymn);
              setCurrentView('detail');
              if (index % 5 === 0 && index !== 0) showAd();
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-3xl font-black bg-gradient-to-br ${theme.primary} bg-clip-text text-transparent`}>
                    {hymn.number}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-1 leading-tight">
                  {language === 'pt' ? hymn.titlePt : hymn.titleEm}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 leading-snug">
                  {language === 'pt' ? hymn.versePt.split('\n')[0] : hymn.verseEm.split('\n')[0]}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(hymn.id);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Heart
                  className={`w-6 h-6 transition-all ${
                    favorites.includes(hymn.id)
                      ? 'fill-red-500 text-red-500 scale-110'
                      : 'text-slate-400 hover:text-red-400'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br ${theme.primary} text-white rounded-2xl shadow-2xl active:scale-95 transition-all flex items-center justify-center`}
        onClick={() => setShowSupportModal(true)}
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );

  // Componente HymnDetail
  const HymnDetail = () => {
    if (!selectedHymn) return null;
    
    return (
      <div className="flex flex-col h-full bg-white">
        <div className={`bg-gradient-to-br ${theme.primary} text-white shadow-lg`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentView('list')}
                className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
              <h1 className="text-xl font-bold">Hino {selectedHymn.number}</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      `${selectedHymn.titlePt}\n\n${selectedHymn.versePt}\n\n${selectedHymn.titleEm}\n\n${selectedHymn.verseEm}`
                    );
                    alert('Hino copiado para a área de transferência!');
                  }}
                  className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all backdrop-blur-sm"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowMenu(true)}
                  className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all backdrop-blur-sm"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`px-6 py-4 bg-gradient-to-r ${theme.gradient} border-b border-slate-200`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">
                {language === 'pt' ? selectedHymn.titlePt : selectedHymn.titleEm}
              </h2>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span className="font-medium">Nº {selectedHymn.number}</span>
                <span>•</span>
                <span>{language === 'pt' ? 'Português' : 'Elomue'}</span>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(selectedHymn.id)}
              className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
            >
              <Heart
                className={`w-7 h-7 transition-all ${
                  favorites.includes(selectedHymn.id)
                    ? 'fill-red-500 text-red-500 scale-110'
                    : 'text-slate-400 hover:text-red-400'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className={`${fontSizes[fontSize]} leading-relaxed whitespace-pre-line text-slate-800`}>
            {language === 'pt' ? selectedHymn.versePt : selectedHymn.verseEm}
          </div>
        </div>

        <div className="p-6 border-t border-slate-200">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setFontSize('small')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                fontSize === 'small'
                  ? `${theme.primarySolid} text-white`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Aa
            </button>
            <button
              onClick={() => setFontSize('medium')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                fontSize === 'medium'
                  ? `${theme.primarySolid} text-white`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Aa
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                fontSize === 'large'
                  ? `${theme.primarySolid} text-white`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Aa
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Componente SideMenu
  const SideMenu = () => {
    if (!showMenu) return null;
    
    return (
      <div className="fixed inset-0 z-50">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" 
          onClick={() => setShowMenu(false)}
        ></div>
        <div className={`absolute inset-y-0 left-0 w-80 max-w-full bg-white shadow-2xl animate-in slide-in-from-left-80 duration-300`}>
          <div className={`bg-gradient-to-br ${theme.primary} text-white p-6`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">Hinário {theme.name.split(' - ')[0]}</h1>
                  <p className="text-xs opacity-90">Menu de navegação</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMenu(false)} 
                className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
            <div className={`bg-gradient-to-br ${theme.gradient} rounded-2xl p-4 mb-4 border ${theme.primaryBorder}`}>
              <h3 className={`font-bold ${theme.primaryText} mb-3 flex items-center gap-2`}>
                <Star className="w-5 h-5" />
                Estatísticas
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total de Hinos</span>
                  <span className={`font-bold ${theme.primaryText}`}>{hymns.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Favoritos</span>
                  <span className="font-bold text-red-600">{favorites.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Anúncios vistos</span>
                  <span className="font-bold text-slate-700">{adCount}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <button 
                onClick={() => {
                  setCurrentView('list');
                  setShowMenu(false);
                }}
                className="w-full bg-white border-2 border-slate-200 text-slate-700 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
              >
                <Home className="w-5 h-5" />
                Lista de Hinos
              </button>
              <button 
                onClick={() => {
                  setCurrentView('favorites');
                  setShowMenu(false);
                }}
                className="w-full bg-white border-2 border-slate-200 text-slate-700 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
              >
                <Heart className="w-5 h-5" />
                Meus Favoritos
              </button>
              <button 
                onClick={() => {
                  setShowSupportModal(true);
                  setShowMenu(false);
                }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-lg transition-all"
              >
                <span className="text-xl">💚</span>
                Apoiar o App
              </button>
              <button 
                onClick={() => {
                  setShowThemeSelector(true);
                  setShowMenu(false);
                }}
                className="w-full bg-white border-2 border-slate-200 text-slate-700 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
              >
                <Star className="w-5 h-5" />
                Mudar Tema
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center mb-2">Configuração AdMob</p>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 text-center font-mono">
                  Int: ...{ADMOB_CONFIG.INTERSTITIAL.slice(-8)}
                </p>
                <p className="text-xs text-slate-400 text-center font-mono">
                  Ban: ...{ADMOB_CONFIG.BANNER.slice(-8)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Componente FavoritesView
  const FavoritesView = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className={`bg-gradient-to-br ${theme.primary} text-white p-6 shadow-xl`}>
        <button 
          onClick={() => setCurrentView('list')} 
          className="mb-4 text-white/90 hover:text-white font-medium flex items-center gap-2"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Voltar
        </button>
        <div className="flex items-center gap-3">
          <Heart className="w-8 h-8 fill-white" />
          <div>
            <h2 className="text-2xl font-bold">Meus Favoritos</h2>
            <p className="text-sm opacity-90">{favorites.length} hinos salvos</p>
          </div>
        </div>
      </div>

      <AdBanner />

      <div className="flex-1 overflow-y-auto p-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">Nenhum favorito ainda</h3>
            <p className="text-slate-500">Toque no ❤️ para adicionar hinos aos seus favoritos</p>
          </div>
        ) : (
          hymns.filter(h => favorites.includes(h.id)).map(hymn => (
            <div
              key={hymn.id}
              className={`bg-white rounded-2xl shadow-sm border border-slate-200 mb-3 p-4 cursor-pointer hover:shadow-lg transition-all`}
              onClick={() => {
                setSelectedHymn(hymn);
                setCurrentView('detail');
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <span className={`text-2xl font-black ${theme.primaryText}`}>{hymn.number}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{language === 'pt' ? hymn.titlePt : hymn.titleEm}</h3>
                  </div>
                </div>
                <Heart className="w-6 h-6 fill-red-500 text-red-500" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Componente AdModal
  const AdModal = () => {
    if (!showAdModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📺</span>
            </div>
            <h3 className="font-bold text-xl text-slate-800 mb-2">Anúncio Intersticial</h3>
            <p className="text-slate-600 mb-6">Este é um espaço para anúncios que ajudam a manter o app gratuito</p>
            <div className="bg-slate-100 rounded-xl p-3 mb-4">
              <p className="text-xs text-slate-500 mb-1">ID da Unidade</p>
              <p className="text-xs font-mono text-slate-700">...{ADMOB_CONFIG.INTERSTITIAL.slice(-16)}</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
              <p className="text-xs">Fechando automaticamente...</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
// ADICIONE ISTO ANTES DO RETURN PRINCIPAL
if (showSplash) {
  return <SplashScreen onComplete={() => setShowSplash(false)} />;
}
  return (
    <div className="w-full h-screen bg-slate-50 overflow-hidden">
      {currentView === 'list' && <HymnList />}
      {currentView === 'detail' && selectedHymn && <HymnDetail />}
      {currentView === 'favorites' && <FavoritesView />}
      {showMenu && <SideMenu />}
      {showAdModal && <AdModal />}
      {showThemeSelector && <ThemeSelector />}
      {showSupportModal && <SupportModal />}
    </div>
  );
};

export default HymnalApp;