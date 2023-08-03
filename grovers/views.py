from django.shortcuts import render
import json
from django.http import JsonResponse

from qiskit import IBMQ
from qiskit.utils import QuantumInstance
from qiskit.circuit.library import PhaseOracle
from qiskit.algorithms import Grover, AmplificationProblem
from qiskit.tools.monitor import job_monitor

IBMQ.enable_account('ENTER API KEY HERE')
provider = IBMQ.get_provider(hub='ibm-q')

def index(request):
    return render(request, 'index.html', {})

def algorithm(request):
    return render(request, 'algorithm.html')

def applications(request):
    return render(request, 'applications.html')

def test(request):
    return render(request, 'test.html')

def intro(request):
    return render(request, 'intro.html')

def grovers(request):

    print(request.body)

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode);

    device = body['device']
    backend = provider.get_backend(device)

    expression = body['expression']
    oracle = PhaseOracle(expression)

    problem = AmplificationProblem(oracle=oracle, is_good_state=oracle.evaluate_bitstring)
    grover = Grover(quantum_instance=backend)

    result = grover.amplify(problem)

    counts = result.circuit_results

    response = JsonResponse({'result': str(counts)})
    return response


