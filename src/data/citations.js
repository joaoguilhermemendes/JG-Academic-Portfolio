export const citationsData = [
  {
    date: '2026-04-01',
    year: '2026',
    title: 'Socratic Tutoring & Epistemic Bias',
    title_pt: 'Tutoria Socrática & Viés Epistêmico',
    venue: 'Project Notes',
    venue_pt: 'Notas de Projeto',
    code: 'PROJ-TUTOR',
    link: '/post/PROJ-TUTOR',
    project_link: '/project/socratic-tutor',
    desc: 'These notes document the implementation strategy and challenges of building an AI-powered tutoring system leveraging Large Language Models (LLMs) to guide students through a Socratic questioning methodology.\n\nThe core focus is exploring ways to force the model to provide questions and hints rather than direct answers, ensuring a deeply engaging cognitive process for the student.',
    desc_pt: 'Estas notas documentam a estratégia de implementação e os desafios da construção de um sistema de tutoria alimentado por IA que utiliza Large Language Models (LLMs) para guiar estudantes através do questionamento socrático.\n\nO foco central é explorar maneiras de forçar o modelo a fornecer perguntas e dicas ao invés de respostas diretas, garantindo um processo cognitivo profundo.',
  },
  {
    date: '2024-11-20',
    year: '2024',
    title: 'Pharmacovigilance Signal Detection',
    title_pt: 'Detecção de Sinais em Farmacovigilância',
    venue: 'Project Notes',
    venue_pt: 'Notas de Projeto',
    code: 'PROJ-PHARM',
    link: '/post/PROJ-PHARM',
    project_link: '/project/pharmacology-sql',
    desc: 'Architectural notes from my database engineering project focusing on the FDA FAERS dataset.\n\nThese notes explore how I designed an exploratory database to analyze adverse drug reaction reports, specifically detailing the schema decisions and query optimization strategies for correlating side effects with patient demographics.',
    desc_pt: 'Notas de arquitetura do meu projeto de engenharia de banco de dados focado no conjunto de dados FAERS da FDA.\n\nEstas notas exploram como desenhei um banco de dados exploratório para analisar relatórios de reações adversas a medicamentos, detalhando especificamente as decisões de schema e a otimização de consultas para associar efeitos colaterais com demografia.',
  },
  {
    date: '2024-05-20',
    year: '2024',
    title: 'Dengue Seasonality & Insights',
    title_pt: 'Sazonalidade da Dengue & Insights',
    venue: 'Project Notes',
    venue_pt: 'Notas de Projeto',
    code: 'PROJ-DENGUE',
    link: '/post/PROJ-DENGUE',
    project_link: '/project/dengue-analysis',
    quote: "The main driver of the epidemic is not just the heavy rains of December and January. The dragging of the peak into April and May proves that the persistent heat of early autumn accelerates the viral cycle, shifting the true risk window significantly.",
    quote_pt: "O motor da epidemia não é apenas a chuva de Dez/Jan. O prolongamento do pico de casos até Abril e Maio prova que o calor persistente do outono continua acelerando o ciclo viral, alterando radicalmente a verdadeira janela de risco.",
    desc: "This project started with a different central question. Initially, my goal was to deeply analyze the performance of epidemiological surveillance mechanisms by studying the 'Symptom-to-Death Interval' in fatal Dengue cases over 10 years in Cabo Frio (2015-2024).\n\nThe hypothesis was straightforward: evaluate if the interval between disease onset and death had improved or worsened chronologically, which would directly expose bottlenecks in the triage, clinical evaluations, and rapid diagnostic workflows in primary care.\n\nHowever, while conducting the initial exploratory analysis of the SINAN database, I struck a massive pattern break that forced a complete conceptual pivot.\n\nI discovered a sharp, recurrent disconnection between the rainfall peak and the actual incidence of cases. Traditionally in public health, dengue cases erupt about 4 to 6 weeks after heavy summer rains. Since the rain peaked in December and January, the outbreak should naturally crest around February. Yet, the data showed the highest incidence dragging heavily and growing into April and May. The insight was loud and clear: the viral cycle in Cabo Frio was being fueled not solely by early summer rains, but by the sustained high coastal temperatures extending deep into autumn, compounded by the unmonitored accumulation of breeding grounds in the post-summer period.\n\nThe project elegantly pivoted from a clinical latency metric to a macro-level strategic seasonality visualization.\n\nTo prove this, the codebase evolved into a heavy-duty analytical pipeline. We pulled a full decade of millions of records from the DataSUS AWS S3 buckets and distilled it down logically. The resulting temporal curve overlays unveiled a deep chronological heterogeneity of the epidemics. We isolated the 2019 outbreak as one of 'Maximum Susceptibility' with a massive delayed peak, and contrasted it with the 2024 outbreak, which exhibited an alarming 'Explosive Velocity', starting dangerously early in January.",
    desc_pt: "Este projeto começou com uma pergunta central bem diferente. Inicialmente, o objetivo era focar na performance bruta da vigilância epidemiológica e medir cirurgicamente o intervalo de 'Sintomas até o Óbito' (Symptom-to-Death Interval) dos casos fatais de Dengue na cidade ao longo de 10 anos.\n\nA hipótese era simples: medir se esse intervalo de tempo estava diminuindo ou aumentando para mapear quantitativamente possíveis atrasos, falhas ou gargalos de triagem na porta dos postos de saúde de atenção primária.\n\nContudo, mergulhando nas análises exploratórias da base do SINAN, cruzei com uma quebra de padrão absurda que forçou uma pivotagem completa do projeto.\n\nDescobri uma forte desassociação cronológica sazonal. O pico climatológico de chuvas sempre acontece em Dezembro e Janeiro, e sabendo que o ovo/larva demora semanas para se desenvolver, era esperado que os surtos estourassem num delay de 4 a 6 semanas (Fevereiro e Março). Só que a distribuição dos dados provou o inverso: o pico explodia e rasgava os recortes de tempo crescendo firme até os meses de Abril e Maio. O insight de inteligência epidemiológica foi claro: o ciclo da epidemia não era empurrado só por um \"susto\" de chuva, mas mantido artificialmente pelo forte calor que não caía no início do outono, segurando os criadouros de água acumulada por meses a fio.\n\nNeste momento, o script migrou de uma conta regressiva de latência clínica para a construção de um painel estratégico analítico de sazonalidade.\n\nPara conseguir extrair o resultado sem fricções, todo o processo se transformou num massivo e limpo pipeline de engenharia analítica em Python (o que se demonstrou essencial para agrupar bilhões de bytes). Reduzimos o caos a curvas empilhadas perfeitamente alinhadas, evidenciando grandes disrupções: o histórico pico de 2019 foi uma montanha de 'Suscetibilidade Máxima' agindo de forma extremamente tardia, completamente o oposto de 2024, que invadiu o município com uma temível 'Velocidade Explosiva' logo nos primeiros dias de Janeiro.",
    pipeline: [
      { step: "Stage 01: Acquisition", text: "Automated batch ingestion of massive raw data from the openDataSUS national S3 buckets." },
      { step: "Stage 02: Reduction", text: "Surgical filtering of national records down exclusively to Cabo Frio, dropping unneeded diagnostic forms to reduce tabular feature space." },
      { step: "Stage 03: Consolidation", text: "Merging intermediate yearly historical files, enforcing temporal coherence via precise datetime conversions and null handling." },
      { step: "Stage 04: Visualizations", text: "Generating actionable analytical density heatmaps, typical seasonal expectation curves, and absolute year-by-year overlays." }
    ],
    pipeline_pt: [
      { step: "Fase 01: Aquisição", text: "Ingestão escalável automatizada em lote dos arquivos brutos nacionais puxados diretamente dos buckets S3 do Ministério da Saúde." },
      { step: "Fase 02: Redução", text: "Filtro cirúrgico das ocorrências geográficas fixando o alvo apenas em Cabo Frio, cortando variáveis ambíguas e otimizando o peso matemático do dataframe." },
      { step: "Fase 03: Consolidação", text: "Mesclagem robusta dos relatórios intermediários anuais. Tratamento forçado de coerência nas conversões de datas (datetime) e dados ausentes." },
      { step: "Fase 04: Visualização Analítica", text: "Renderização de matrizes coloridas (Mapas de Calor), curvas base de padrão sazonal e visualizações brutas contrastantes empilhando ano a ano para a conclusão." }
    ]
  },
  {
    date: '2023-12-01',
    year: '2023',
    title: 'Discrete Math Consolidation Library',
    title_pt: 'Biblioteca de Consolidação de Matemática Discreta',
    venue: 'Project Notes',
    venue_pt: 'Notas de Projeto',
    code: 'MATH-LIB',
    link: '/post/MATH-LIB',
    github: 'https://github.com/joaoguilhermemendes/DiscreteMathLib',
    desc: 'This post highlights the DiscreteMathLib Python repository.\n\nDuring my university studies, I found that translating mathematical formulas—like set theory notation, complex conjunctions, and logic propositions into executable code forces a deep understanding of the fundamentals.\n\nThe terminal interface is interactive, giving step-by-step resolution. You can view the demonstration graphics capturing the table logic generations and truth tables below.',
    desc_pt: 'Esta nota destaca o repositório DiscreteMathLib escrito em Python.\n\nDurante meus estudos na faculdade, descobri que traduzir fórmulas matemáticas (como teoria dos conjuntos, conjunções complexas e proposições lógicas) para um código executável força uma compreensão profunda dos fundamentos teóricos.\n\nA interface no terminal é interativa, fornecendo resolução passo a passo de combinações, uniões interativas e relações lógicas. Você pode conferir os gráficos de demonstração que capturam tabelas verdade abaixo.',
    images: [
      'https://raw.githubusercontent.com/joaoguilhermemendes/DiscreteMathLib/main/samples-img/image-1.png',
      'https://raw.githubusercontent.com/joaoguilhermemendes/DiscreteMathLib/main/samples-img/image-2.png',
      'https://raw.githubusercontent.com/joaoguilhermemendes/DiscreteMathLib/main/samples-img/image-3.png',
      'https://raw.githubusercontent.com/joaoguilhermemendes/DiscreteMathLib/main/samples-img/image-4.png'
    ]
  }
];
