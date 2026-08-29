const icon = (name) => `/icons/options/${name}.png`
const option = (name, description, iconName) => ({ name, description, icon: icon(iconName) })

export const taxonomy = [
  {
    name: 'Entity Resources',
    description: 'characterizes the foundational resources each entity contributes before a two-object relation is formed.',
    subcategories: [
      {
        name: 'A1 Physical Form',
        description: 'specifies the directly observable and manipulable physical form of each entity.',
        items: [
          option('Block', 'A volumetric object with relatively balanced dimensions and no dominant axis, surface, or cavity.', 'block'),
          option('Rod', 'An elongated object with one dominant longitudinal axis and two comparatively small dimensions.', 'rod'),
          option('Planar Surface', 'An object extended primarily along two dimensions, with a thin third dimension and a salient interaction surface.', 'planar-surface'),
          option('Container', 'An object with an interior or open cavity that can spatially receive, surround, or hold another entity.', 'container'),
          option('Sphere', 'A near-spherical or radially symmetric object with no dominant plane or stable orientation.', 'sphere'),
          option('Ring', 'A continuous or near-continuous closed structure with a salient central opening.', 'ring')
        ]
      },
      {
        name: 'A2 Digital Semantic Resources',
        description: 'specifies the primary digital meaning assigned to or carried by an entity before it is related to another entity.',
        items: [
          option('No Additional Semantics', 'The entity retains only its existing real-world meaning and receives no additional digital meaning.', 'no-additional-semantics'),
          option('Data', 'The entity is bound to or represents specific information content.', 'data'),
          option('Function', 'The entity is assigned a specific digital operation or control capability.', 'function'),
          option('Virtual-Object Proxy', 'The entity represents and controls a corresponding virtual object.', 'virtual-object-proxy'),
          option('Virtual-Character Proxy', 'The entity represents a specific person, character, or intelligent agent.', 'virtual-character-proxy')
        ]
      }
    ]
  },
  {
    name: 'Relational Composition',
    description: 'characterizes how the two entities are organized into a functional and spatial relation.',
    subcategories: [
      {
        name: 'B1 Role Configuration',
        description: 'specifies whether the entities assume equivalent and interchangeable functional roles within the relation.',
        items: [
          option('Symmetric', 'The two entities assume equivalent and interchangeable relational roles.', 'symmetric'),
          option('Asymmetric', 'The two entities assume distinct and non-interchangeable functional roles.', 'asymmetric')
        ]
      },
      {
        name: 'B2 Spatial Constraint',
        description: 'specifies the geometric configuration required to establish or maintain the relation.',
        items: [
          option('None', 'No specific distance, orientation, position, axis, plane, or shape match is required.', 'none'),
          option('Distance', 'The relation is established or varied primarily by the distance between the entities.', 'distance'),
          option('Orientation', 'The relation requires a particular relative direction, alignment, parallelism, perpendicularity, or angular range.', 'orientation'),
          option('Region', 'A reference point on one entity must reach or approach a specified anchor or bounded region.', 'region'),
          option('Axis', 'An entity is constrained to a line or axis, or must move around an axis.', 'axis'),
          option('Plane', 'An entity must lie on, attach to, align with, or move along a plane or surface.', 'plane'),
          option('Shape', 'The relation depends on the matching, fitting, or compatibility of contours, interfaces, openings, or local geometry.', 'shape')
        ]
      },
      {
        name: 'B3 Relational Logic',
        description: 'specifies the functional or organizational meaning that the system assigns to the established relation.',
        items: [
          option('Peer Association', 'The entities form a comparison or association without a directed influence.', 'peer-association'),
          option('One-Way Influence', 'One entity acts on the other entity or its associated output in a directed relation.', 'one-way-influence'),
          option('Composition', 'The entities combine to form a new structure, group, or composite whole.', 'composition')
        ]
      }
    ]
  },
  {
    name: 'Interaction Dynamics',
    description: 'characterizes how users establish and modify the two-object relation through action.',
    subcategories: [
      {
        name: 'C1 Control Allocation',
        description: 'specifies whether user action primarily manipulates one entity or jointly changes the relation between both entities.',
        items: [
          option('Single-Entity Control', 'The user primarily manipulates one entity while the other serves as a reference or target.', 'single-entity-control'),
          option('Dual-Entity Relative Control', 'The user manipulates both entities to jointly change their relative relation.', 'dual-entity-relative-control')
        ]
      },
      {
        name: 'C2 Interaction Continuity',
        description: 'specifies the temporal organization of user actions and the resulting relational change.',
        items: [
          option('Discrete', 'The interaction consists of one or more distinct and distinguishable actions.', 'discrete'),
          option('Continuous', 'The interaction consists of sustained actions and continuously varying relational change.', 'continuous')
        ]
      }
    ]
  },
  {
    name: 'Interaction Display',
    description: 'characterizes how the system presents the outcome of establishing or modifying a two-object relation.',
    subcategories: [
      {
        name: 'D1 Feedback Placement',
        description: 'specifies the spatial referent to which the interaction outcome is primarily anchored or applied.',
        items: [
          option('One of the Entities', 'Feedback is anchored to one entity or its immediate vicinity.', 'one-of-the-entities'),
          option('Composite Whole', 'Feedback is anchored to the composite formed by the two entities rather than to either entity individually.', 'composite-whole'),
          option('Relational Space of the Entities', 'Feedback occupies a line, surface, region, volume, or path defined by the spatial relation between the two entities.', 'relational-space'),
          option('Scene', 'Feedback affects the overall environment, workspace, or scene state.', 'scene'),
          option('Remote Virtual Object', 'Feedback is presented on a virtual or digital object spatially separate from both entities.', 'remote-virtual-object')
        ]
      },
      {
        name: 'D2 Feedback Form',
        description: 'specifies how feedback changes over time once presented.',
        items: [
          option('Static', 'Feedback remains essentially unchanged while the current relational state holds.', 'static'),
          option('One-Time Animation', 'A discrete event triggers a brief transition with a defined beginning and end.', 'one-time-animation'),
          option('Continuous Update', 'Feedback updates continuously with changes in the object relation, user action, system state, or time.', 'continuous-update')
        ]
      },
      {
        name: 'D3 Feedback Persistence',
        description: 'specifies how long feedback remains available and whether its presence depends on the underlying relation.',
        items: [
          option('Transient', 'Feedback responds to a single event and disappears after presentation.', 'transient'),
          option('Relation-Dependent', 'Feedback remains available only while the underlying relation holds.', 'relation-dependent'),
          option('Persistent', 'Feedback remains after the relation is established until explicitly reset.', 'persistent')
        ]
      },
      {
        name: 'D4 Feedback Modality',
        description: 'specifies the sensory channel through which the system communicates its response to the two-object relation.',
        items: [
          option('Visual', 'Feedback is conveyed through graphics, text, color, animation, or spatial visual content.', 'visual'),
          option('Auditory', 'Feedback is conveyed through notification tones, ambient sound, spatial audio, or speech.', 'auditory'),
          option('Haptic', 'Feedback is conveyed through vibration, force feedback, or other mechanical stimulation.', 'haptic')
        ]
      }
    ]
  }
]
