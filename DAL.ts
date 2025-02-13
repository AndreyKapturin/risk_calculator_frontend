import { IndicatorType, type ICriterion, type IIndicator, type IObjectOfControl } from './types';

class Criterion implements ICriterion {
  text: string = '';
  value: number | null = null;

  constructor(text: string, value: number|null = null) {
    this.text = text;
    this.value = value;
  }
}

class Indicator implements IIndicator {
  text: string;
  type: IndicatorType;
  criteries: Criterion[];

  constructor(text: string, type: IndicatorType, criteries: Criterion[] = []) {
    this.text = text;
    this.type = type;  
    this.criteries = criteries;
  }
}

class ObjectOfControl implements IObjectOfControl {
  name: string;
  slug: string;
  indicators: Indicator[];
  potentialNegativeConsequencesIndex: number;

  constructor(name: string, potentialNegativeConsequencesIndex: number, indicators: Indicator[] = []) {
    this.name = name;
    this.slug = name.replace(/\s+/g, '-');
    this.indicators = indicators;
    this.potentialNegativeConsequencesIndex = potentialNegativeConsequencesIndex;
  }
  
  public get href() : string {
    return '/forms/' + this.slug;
  }
}

const objectsOfControl = [
  new ObjectOfControl(
    'Объекты образования и объекты, на которых осуществляется деятельность детских лагерей',
    4.079287,
    [
      new Indicator(
        'Степень огнестойкости',
        IndicatorType.RiskIndicator,
        [
          new Criterion('I, II', 0),
          new Criterion('III', 1),
          new Criterion('IV, V', 4),
        ]
      ),
      new Indicator(
        'Наличие людей в селитебной зоне',
        IndicatorType.RiskIndicator,
        [
          new Criterion('Да', 4),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Высота здания, сооружения (наружной установки)',
        IndicatorType.RiskIndicator,
        [
          new Criterion('до 28 м.', 0),
          new Criterion('от 28 до 50 м.', 2),
          new Criterion('свыше 50 м .', 4),
        ]
      ),
      new Indicator(
        'Наличие открытых лестниц и (или) многосветных пространств',
        IndicatorType.RiskIndicator,
        [
          new Criterion('Да', 4),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие постоянных рабочих мест',
        IndicatorType.RiskIndicator,
        [
          new Criterion('Да', 3),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие маломобильных групп населения, пожилых людей старше 65 лет на территории',
        IndicatorType.RiskIndicator,
        [
          new Criterion('Да', 10),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Системы противопожарной защиты (автоматические установки пожаротушения и пожарной сигнализации, система оповещения людей о пожаре и управления эвакуацией людей, система противодымной вентиляции) смонтированы более 10 лет назад и не подвергались капитальному ремонту',
        IndicatorType.RiskIndicator,
        [
          new Criterion('Да', 10),
          new Criterion('Нет или сведения отсутствуют', 0),
        ]
      ),
      new Indicator(
        'Наличие на объекте пожарной охраны, обеспеченной пожарно-техническим вооружением',
        IndicatorType.RiskIndicator,
        [
          new Criterion('Да', -15),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Привлечение к охране организации, специально учрежденной для оказания охранных услуг, зарегистрированной в установленном законом порядке и имеющей лицензию на осуществление частной охранной деятельности',
        IndicatorType.RiskIndicator,
        [
          new Criterion('Нет', 0),
          new Criterion('Не круглосуточно', -3),
          new Criterion('Круглосуточно', -5),
        ]
      ),
      new Indicator(
        'Категория здания, сооружения (наружной установки), если категорируется',
        IndicatorType.RiskIndicator,
        [
          new Criterion('А, АН - для наружной установки', 8),
          new Criterion('Б, БН - для наружной установки', 8),
          new Criterion('В с долей помещений В1-В2 более 50%', 10),
          new Criterion('В с долей помещений В1-В2 менее 50%, ВН - для наружной установки', 4),
          new Criterion('Г, ГН -для наружной установки', 2),
          new Criterion('Д, ДН - для наружной установки', 0),
        ]
      ),
      new Indicator(
        'Электропроводка выполнена более 10 лет назад и не подвергалась капитальному ремонту',
        IndicatorType.RiskIndicator,
        [
          new Criterion('Да', 5),
          new Criterion('Нет или сведения отсутствуют', 0),
        ]
      ),
      new Indicator(
        'Вид электропроводки (за исключением зданий и сооружений  V степени огнестойкости)',
        IndicatorType.RiskIndicator,
        [
          new Criterion('Открытая', 2),
          new Criterion('Скрытая', 0),
        ]
      ),
      new Indicator(
        'Электрическое отопление (за исключением электрических котлов с контуром отопления)',
        IndicatorType.RiskIndicator,
        [
          new Criterion('Да', 5),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие печного отопления',
        IndicatorType.RiskIndicator,
        [
          new Criterion('Да', 10),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Категория объекта по потенциальной радиационной опасности',
        IndicatorType.RiskIndicator,
        [
          new Criterion('I', 10),
          new Criterion('II', 7),
          new Criterion('III', 4),
          new Criterion('IV', 2),
          new Criterion('Не категорируется', 0),
        ]
      ),
      new Indicator(
        'Наличие в отношении объекта действующего предписания органа государственного пожарного надзора, содержащего сведения об неустраненных нарушениях установленных требований, предъявляемых к путям эвакуации, зонам безопасности для маломобильных групп населения, автоматическим системам противопожарной защиты (автоматические установки пожаротушения и пожарной сигнализации, система оповещения людей о пожаре и управления эвакуацией людей, система противодымной ветиляции)',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', 15),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие в отношении объекта действующего предписания органа государственного пожарного надзора, содержащего сведения об неустраненных нарушениях установленных требований, предъявляемых к  обеспечению деятельности пожарных подразделений',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', 6),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие в отношении объекта действующего предписания органа государственного пожарного надзора, содержащего сведения об неустраненных нарушениях установленных требований,   не вошедшими в пункты 1, 2',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', 2),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие в отношении объекта  заключения о независимой оценки пожарного риска (аудита пожарной безопасности) с выводом о выполнении требований пожарной безопасности и соблюдении противопожарного режима',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', -10),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие на объекте учреждений, осуществляющих экономическую деятельность, не соответствующую функциональному назначению здания',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', 3),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие сведений о проведении на объекте перепланировки, реконструкции, капитального ремонта или технического перевооружения',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', 3),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Предоставление заключения по оценке пожарного риска с обоснованием отступления от требований нормативных локументов по пожарной безопасности',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', 5),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие автоматического дублирования сигнала в подразделение пожарной охраны с использованием системы передачи извещения о пожаре (за исключением зданий классов функциональной пожарной опасности Ф1.1, Ф1.2, Ф4.1, Ф4.2',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', -5),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие зарегистрированных случаев пожаров за последние 5 лет (за исключением пожаров причиной которых является умышленное уничтожение или повреждения имущества)',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', 20),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие вступившего в законную силу постановления суда о назначении наказания в виде административного приостановления деятельности юридического лица и индивидуального предпринимателя за нарушения требований пожарной безопасности на объекте  либо решения суда о приостановлении деятельности в соответствии с частью 2 статьи 1065 Гражданского кодекса Российской Федерации в течение последних 3 лет',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', 30),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие информации о вводе в эксплуатацию, либо фактическом функционировании объекта защиты, получившего отрицательное заключение при согласовании специальных технических условий, отражающих специфику обеспечения его пожарной безопасности, содержащих комплекс необходимых инженерно-технических и организационных мероприятий по обеспечению пожарной безопасности, стандарта организации',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', 20),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Непредставление в установленном порядке декларации пожарной безопасности в отношении объекта защиты, для которого законодательством Российской Федерации о градостроительной деятельности предусмотрено проведение экспертизы проектной документации',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', 5),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие сведений о ненадлежащей работе при пожаре имеющихся автоматических систем противопожарной защиты',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', 10),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Наличие сведений о приостановлении действия лицензии юридического лица, индивидуального предпринимателя на осуществление деятельности по техническому обслуживанию и ремонту средств обеспечения пожарной безопасности вследствие грубых нарушений лицензионных требований',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', 10),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Предоставление контролируемым лицом договора страхования рисков причинения вреда (ущерба), объектом которого являются имущественные интересы контролируемого лица, связанные с его обязанностью возместить вред (ущерб) охраняемым законом ценностям, причиненный вследствие нарушения контролируемым лицом требований пожарной безопасности',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', -10),
          new Criterion('Нет', 0),
        ]
      ),
      new Indicator(
        'Предоставление в добровольном порядке декларации пожарной безопасности (статья 64 Федерального закона "Технический регламент о требованиях пожарной безопасности") в отношении объекта (наружной установки), для которого законодательством Российской Федерации о градостроительной деятельности не предусмотрено проведение экспертизы проектной документации',
        IndicatorType.GoodFaithCriterion,
        [
          new Criterion('Да', -10),
          new Criterion('Нет', 0),
        ]
      ),
    ]
  ),
  new ObjectOfControl('Объекты здравоохранения', 12.468892),
  new ObjectOfControl('Объекты социальной защиты', 42.552172),
  new ObjectOfControl('Объекты религиозного назначения', 20.646841),
  new ObjectOfControl('Объекты культурно-досугового назначения', 0.948917),
  new ObjectOfControl('Объекты временного размещения людей, туризма и отдыха', 50.399676),
  new ObjectOfControl('Объекты торговли', 1.961148),
  new ObjectOfControl('Объекты общественного питания', 17.024222),
  new ObjectOfControl('Объекты бытового обслуживания и предоставления услуг населению', 3.030130),
  new ObjectOfControl('Объекты транспортной инфраструктуры', 7.914622),
  new ObjectOfControl('Объекты административного назначения', 5.178677),
  new ObjectOfControl('Объекты жилого назначения (многоквартирные жилые дома)', 22.332514),
  new ObjectOfControl('Объекты производственного назначения', 26.251105),
  new ObjectOfControl('Объекты складского назначения', 17.937421),
  new ObjectOfControl('Объекты сельскохозяйственного назначения', 24.927467),
  new ObjectOfControl('Наружные установки', 38.342078),
];

export function getObjectsOfControl() {
  return objectsOfControl;
}

export function getObjectsOfControlBySlug(slug: string): ObjectOfControl | null {
  return objectsOfControl.find(o => o.slug === slug) ?? null;
}