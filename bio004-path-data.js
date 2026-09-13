/* ============================================================
   BIO 004 Human Anatomy, Fall 2026
   bio004-path-data.js

   The per-week facts that bio004-path.js cannot read from the
   schedule. Everything else on the weekly path (videos, sheets,
   notes, slides, lab sprints, class days) comes from
   session-links.js, week-links.js and schedule-fall2026.js, so
   this file stays small.

   Per week:
     histology  true when the week has slides to identify, which
                turns on Tissue Chart Practice, Histology Help and
                the "Don't memorize the picture" prompt
     muscles    true when the week has muscles on the models,
                which turns on the I O A muscle charts
     exam       exam number when there is one this week
     ready      the "You're Ready When" checklist for the week,
                written for that week's content, not a generic
                list. Keep each one short and checkable.

   Do not add assignments here. This organizes what exists.
   ============================================================ */

window.BIO004_PATH = {
  1: { histology: true, muscles: false, exam: null, ready: [
    'I can use anatomical position and the directional terms without looking at my notes.',
    'I can name the body cavities and regions on an unlabeled diagram.',
    'I can label the parts of a cell from memory.',
    'I can identify each epithelial tissue on a slide I have not seen before, and say which feature told me.',
    'I know which structures I still miss, and I have gone back to Loops for them.'
  ]},
  2: { histology: true, muscles: false, exam: null, ready: [
    'I can draw a cell and label its organelles from memory.',
    'I can identify every connective tissue on an unfamiliar slide and name the fibers, cells and ground substance I used to decide.',
    'I can tell the lookalikes apart without a label: dense regular from dense irregular, hyaline from elastic cartilage.',
    'I can say where in the body each connective tissue is found.',
    'I have practiced my missed tissues again in Loops, not just looked at them again.'
  ]},
  3: { histology: true, muscles: false, exam: null, ready: [
    'I can identify skeletal, cardiac and smooth muscle and nervous tissue on a slide and name the feature I used.',
    'I can draw and label the layers of the skin from memory, including the strata of the epidermis.',
    'I can find the hair follicle, sweat gland and sebaceous gland on a skin slide.',
    'I can fill in the tissue chart from memory, column by column.',
    'I can explain why a tissue\'s structure fits the place it is found.'
  ]},
  4: { histology: true, muscles: false, exam: 1, ready: [
    'I have scored a full practice exam on Module 1 without my notes open.',
    'I can identify any Module 1 tissue on a slide I have not seen, under time, and explain what told me.',
    'I can draw and label the skin and a cell from memory.',
    'I can identify an osteon, its lamellae, lacunae and canaliculi on a bone slide.',
    'I have gone back to Loops for everything I missed on the practice exam.'
  ]},
  5: { histology: true, muscles: false, exam: null, ready: [
    'I can draw and label a long bone and an osteon from memory.',
    'I can name the skull bones and their features on a real skull, in any orientation.',
    'I can tell a cervical, thoracic and lumbar vertebra apart and say which feature I used.',
    'I can name the parts of the sternum and the rib types without a label.',
    'I have practiced the skull features I miss on a different skull or image, not only the one I learned on.'
  ]},
  6: { histology: false, muscles: false, exam: null, ready: [
    'I can identify every upper limb bone and its markings on a disarticulated bone, and tell right from left.',
    'I can identify every lower limb bone and its markings the same way.',
    'I can name the structural joint types and the parts of a synovial joint from memory.',
    'I can identify a bone marking when the bone is handed to me in a different orientation.',
    'I know which markings I still miss and have drilled them again in Loops.'
  ]},
  7: { histology: false, muscles: false, exam: 2, ready: [
    'I have scored a full practice exam on Module 2 without my notes open.',
    'I can identify bones and markings on a specimen I have not handled before, under time.',
    'I can name the ligaments and structures of the knee and shoulder on a model.',
    'I can explain which feature told me what a bone or marking was.',
    'I have gone back to Loops for what I missed rather than rereading the notes.'
  ]},
  8: { histology: true, muscles: true, exam: null, ready: [
    'I can draw the heart chambers, valves and great vessels from memory and trace the path of blood through them.',
    'I can identify the heart structures on a model and on a sheep heart, in any orientation.',
    'I can identify skeletal, cardiac and smooth muscle on a slide and name the feature I used (striations, intercalated discs, branching).',
    'I can label a muscle fiber and a sarcomere from memory.',
    'I can identify the head, neck, chest and anterior brachium muscles on the models.'
  ]},
  9: { histology: true, muscles: true, exam: null, ready: [
    'I can identify each formed element on a blood smear and say the feature I used (nucleus shape, granules, size).',
    'I can identify the posterior thorax, shoulder, brachium and antebrachium muscles on the models from any view.',
    'I can name the cardiac conduction structures in order from memory.',
    'I can identify a muscle when the model is turned or a different model is used.',
    'I have practiced my missed muscles again in Loops and on the I O A charts.'
  ]},
  10: { histology: true, muscles: true, exam: 3, ready: [
    'I have scored a full practice exam on Module 3 without my notes open.',
    'I can name the major vessels of the upper limb on a model and on a diagram.',
    'I can identify the antebrachium muscles cold, on a model I have not practiced on.',
    'I can name the fetal circulation structures and what each one connects.',
    'I have gone back to Loops for what I missed on the practice exam.'
  ]},
  11: { histology: false, muscles: true, exam: null, ready: [
    'I can trace the respiratory passage from the nose to an alveolus from memory.',
    'I can identify the respiratory structures on the models and slides, including the lung lobes and the bronchial tree.',
    'I can name the endocrine glands and point to where each one is.',
    'I can name the lymphatic organs and where they are found.',
    'I can identify the thigh muscles on the models.'
  ]},
  12: { histology: false, muscles: true, exam: null, ready: [
    'I can identify the thigh and leg muscles on the models from any view.',
    'I can draw the alimentary canal in order from memory.',
    'I can identify respiratory structures when the model or image is different from the one I learned on.',
    'I can explain what feature told me which muscle I was looking at.',
    'I have drilled the muscles I miss again in Loops and on the I O A charts.'
  ]},
  13: { histology: false, muscles: false, exam: null, ready: [
    'I can name each region of the alimentary canal and its layers on a model and on a slide.',
    'I can identify the accessory organs on a model: liver lobes, gallbladder, pancreas and salivary glands.',
    'I can name the peritoneal folds and the layers of the abdominal wall on a model.',
    'I can identify a GI structure on a different model or image than the one I learned on.',
    'I know what I still miss and have practiced it again.'
  ]},
  14: { histology: false, muscles: false, exam: 4, ready: [
    'I have scored a full practice exam on Module 4 without my notes open.',
    'I can identify the kidney structures on a model and on a slide, including the parts of the nephron.',
    'I can trace the path of urine from the nephron to the urethra from memory.',
    'I can identify a Module 4 structure on a specimen I have not practiced on, under time.',
    'I have gone back to Loops for what I missed on the practice exam.'
  ]},
  15: { histology: false, muscles: false, exam: null, ready: [
    'I can identify the male reproductive structures on the models and slides.',
    'I can identify the female reproductive structures on the models and slides.',
    'I can trace the path of sperm from the testis to the outside from memory.',
    'I can identify the kidney and its microscopic structures cold.',
    'I can explain which feature told me what a structure was.'
  ]},
  16: { histology: false, muscles: false, exam: null, ready: [
    'I can identify the brain regions, ventricles and meninges on a model and on a sheep brain, in any orientation.',
    'I can name the twelve cranial nerves in order from memory and locate them on the brain model.',
    'I can draw and label a neuron from memory.',
    'I can identify the brainstem structures on a model I have not practiced on.',
    'I know which structures I still miss and have drilled them again in Loops.'
  ]},
  17: { histology: false, muscles: false, exam: 5, ready: [
    'I have scored a full practice exam on Module 5 without my notes open.',
    'I can identify the spinal cord structures on a model and on a cross-section slide.',
    'I can name the nerve plexuses and their major nerves from memory.',
    'I can name the structures of the sympathetic and parasympathetic divisions and where they sit.',
    'I have gone back to Loops for what I missed on the practice exam.'
  ]}
};
