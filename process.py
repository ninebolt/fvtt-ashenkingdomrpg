import json
import requests

spell_url = "https://api.ashenkingdoms.com/v1/spells"

def get_spells():
    headers = {"Accept": "application/json"}
    response = requests.get(url=spell_url, headers=headers, verify=False)

    if response.status_code >= 400:
        raise RuntimeError(
            f"Unable to call AshRPG spell API, reason: {response.json()}"
        )

    return response.json()

def get_components(components):
    spl = [s.strip() for s in components.split(',')]
    return {
        'verbal': 'V' in spl,
        'somatic': 'S' in spl,
        'material': 'M' in spl
    }


spells = list(map(lambda x : (
                {
                    'arcanumCost': x['arcanumCost'],
                    'area': x['area'],
                    'castTime': x['castTime'],
                    **get_components(x['components']),
                    'concentration': x.get('concentration', False),
                    'domain': x['domain'].lower(),
                    'duration': x['duration'],
                    'range': x['range']
                }
            ), get_spells()))

with open('spells.json', 'w') as f:
    f.write(json.dumps(spells))
